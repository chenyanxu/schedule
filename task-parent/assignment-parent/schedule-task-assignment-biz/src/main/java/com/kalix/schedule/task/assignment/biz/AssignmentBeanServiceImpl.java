package com.kalix.schedule.task.assignment.biz;

import com.kalix.admin.core.api.biz.IUserBeanService;
import com.kalix.admin.core.api.dao.IOrganizationBeanDao;
import com.kalix.common.message.api.Const;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.BeanUtil;
import com.kalix.framework.core.util.JNDIHelper;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.system.dict.api.biz.IScheduleDictBeanService;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentBeanService;
import com.kalix.schedule.task.assignment.api.dao.IAssignmentBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IEventBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IProgressBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IReadingBeanDao;
import com.kalix.schedule.task.assignment.entities.AssignmentBean;
import com.kalix.schedule.task.assignment.entities.EventBean;
import com.kalix.schedule.task.assignment.entities.ProgressBean;
import com.kalix.schedule.task.assignment.entities.ReadingBean;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventAdmin;

import java.io.IOException;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

/**
 * @类描述：
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class AssignmentBeanServiceImpl extends ShiroGenericBizServiceImpl<IAssignmentBeanDao, AssignmentBean> implements IAssignmentBeanService {
    private JsonStatus jsonStatus = new JsonStatus();
    private IUserBeanService userBeanService;
    private EventAdmin eventAdmin;

    public AssignmentBeanServiceImpl() {
        super.init(AssignmentBean.class.getName());
    }

    private IScheduleDictBeanService scheduleDictBeanService;


    private IProgressBeanDao progressBeanDao;
    private IEventBeanDao eventBeanDao;
    private IReadingBeanDao readingBeanDao;

    /**
     * 查询母任务,提供给combobox使用,已完成，已失败，已取消的母任务不出现在combobox中
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    @Override
    public JsonData getParentTaskCombox(Integer page, Integer limit, String jsonStr) {
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        String condition = " where 1=1 ";
        for (Map.Entry<String, String> entry : jsonMap.entrySet()) {
            if (entry.getValue() != null && !entry.getValue().equals("")) {
                condition = condition + " and " + entry.getKey() + " = " + entry.getValue();
            }
        }
        String userId = String.valueOf(this.getShiroService().getCurrentUserId());
        condition += " and userId=" + userId;
        // 只有任务状态为进行中、等待接收、提交审核的任务在新建任务时可作为母任务
        condition += " and (state = 0 or state = 2 or state = 3)";
        // 来源于部门计划的任务或者自定义的任务可作为母任务，已经来源于母任务的子任务就不能再作为母任务了
        condition += " and (sourceType = 0 or sourceType=2)";

        List comboList = dao.findByNativeSql("select * from schedule_assignment" + condition, AssignmentBean.class, null);

        JsonData jsonData = new JsonData();
        jsonData.setData(comboList);
        jsonData.setTotalCount((long) comboList.size());

        return jsonData;
    }

    /**
     * 根据登录用户的信息，查询任务
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    @Override
    public JsonData getSelfEntityByQuery(Integer page, Integer limit, String jsonStr) {
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        Long userId = this.getShiroService().getCurrentUserId();
        jsonMap.put("userId", String.valueOf(userId));

        //查找任务布置人是当前用户的数据
        String newJsonStr = SerializeUtil.serializeJson(jsonMap);
        JsonData jsonData = super.getAllEntityByQuery(page, limit, newJsonStr);
        List<AssignmentBean> beanList = jsonData.getData();

        for (int i = 0; i < beanList.size(); i++) {
            //处理百分比显示 percentNumber
            beanList.get(i).setPercentNumber((int) (beanList.get(i).getPercent() * 100));
            //统计子任务数
            List<AssignmentBean> subTaskList = dao.find("select ob from AssignmentBean ob where ob.sourceId=" + beanList.get(i).getId(), null);
            if (subTaskList.size() == 0) {
                beanList.get(i).setSubTaskCount(0);
            } else {
                beanList.get(i).setSubTaskCount(subTaskList.size());
            }
        }

        //翻译任务负责人
        List ids = BeanUtil.getBeanFieldValueList(beanList, "head");
        List values = this.userBeanService.getFieldValuesByIds(ids.toArray(), "name");
        BeanUtil.setBeanListFieldValues(beanList, "header", values);

        jsonData.setTotalCount(jsonData.getTotalCount());
        jsonData.setData(beanList);

        return jsonData;
    }

    /**
     * 新增任务
     *
     * @param entity
     * @return
     */
    @Override
    public JsonStatus saveEntity(AssignmentBean entity) {
        // 获取登录用户id及用户名
        Long userId = this.getShiroService().getCurrentUserId();
        String userName = this.getShiroService().getCurrentUserRealName();
        // 新增时，写入用户id及用户名
        entity.setUserId(userId);
        entity.setUserName(userName);

        //设置进度
        if (entity != null) {
            entity.setPercent(entity.getPercent());
        } else {
            entity.setPercent(0f);
        }
        postNewAssignmentEvent(entity);

        JsonStatus jsonStatus = super.saveEntity(entity);
        //保存任务事件
        saveEventEntity(entity);
        return jsonStatus;
    }

    /**
     * 修改任务
     *
     * @param entity
     * @return
     */
    @Override
    public JsonStatus updateEntity(AssignmentBean entity) {
        //保存任务事件
        saveEventEntity(entity);
        //设置进度
        if (entity != null) {
            entity.setPercent(entity.getPercent());
        } else {
            entity.setPercent(0f);
        }
        return super.updateEntity(entity);
    }

    /**
     * 根据任务id查找进度
     *
     * @param assignmentId
     * @return
     */
    @Override
    public JsonData getAllProgressEntity(long assignmentId) {
        JsonData jsonData = new JsonData();
        List<ProgressBean> progressList = progressBeanDao.find("select ob from ProgressBean ob where ob.assignmentId = ?1", assignmentId);
        jsonData.setTotalCount((long) progressList.size());
        jsonData.setData(progressList);

        return jsonData;
    }

    /**
     * 根据任务id查找任务已读和未读用户
     *
     * @param assignmentId
     * @return
     */
    @Override
    public JsonData getAllReadingEntity(long assignmentId) {
        JsonData jsonData = new JsonData();
        List<ReadingBean> readingList = readingBeanDao.find("select ob from ReadingBean ob where ob.assignmentId=?1", assignmentId);
        jsonData.setTotalCount((long) readingList.size());
        jsonData.setData(readingList);

        return jsonData;
    }

    /**
     * 根据任务id查找任务的事件
     *
     * @param assignmentId
     * @return
     */
    @Override
    public JsonData getAllEventEntity(Integer page, Integer limit,long assignmentId) {
        JsonData jsonData = eventBeanDao.findByNativeSql("select * from schedule_event ob where ob.assignmentId=?1 order by ob.creationDate desc", page,limit,EventBean.class,assignmentId);
        //翻译任务事件操作人
        List eventList = jsonData.getData();
        List ids = BeanUtil.getBeanFieldValueList(eventList, "operator");
        List values = this.userBeanService.getFieldValuesByIds(ids.toArray(), "name");
        BeanUtil.setBeanListFieldValues(eventList, "operatorName", values);

        jsonData.setTotalCount(jsonData.getTotalCount());
        jsonData.setData(eventList);

        return jsonData;
    }

    /**
     * 根据任务id查找任务的事件
     *
     * @param departmentPlanId
     * @return
     */
    @Override
    public JsonData getAllTaskEntityByDepartmentPlanId(Integer page, Integer limit,long departmentPlanId) {
        JsonData jsonData = dao.findByNativeSql("select * from schedule_assignment ob where ob.sourceId=?1 order by ob.creationDate desc", page,limit,AssignmentBean.class,departmentPlanId);
        //翻译任务负责人
        List taskList = jsonData.getData();
        List ids = BeanUtil.getBeanFieldValueList(taskList, "head");
        List values = this.userBeanService.getFieldValuesByIds(ids.toArray(), "name");
        BeanUtil.setBeanListFieldValues(taskList, "header", values);

        jsonData.setTotalCount(jsonData.getTotalCount());
        jsonData.setData(taskList);

        return jsonData;
    }

    //保存任务事件
    private void saveEventEntity(AssignmentBean assignmentBean) {
        int eventType = assignmentBean.getEventType();
        String eventContent;
        switch (eventType) {
            case 0:
                eventContent = "布置了一个任务";
                break;
            case 1:
                eventContent = "拒绝了一个任务";
                break;
            case 2:
                eventContent = "接收了一个任务";
                break;
            case 3:
                eventContent = "完成任务(申请审核)";
                break;
            case 4:
                eventContent = "任务审核通过,评分为" + assignmentBean.getScore();
                break;
            case 5:
                eventContent = "任务失败";
                break;
            case 6:
                eventContent = "任务撤销";
                break;
            case 7:
                eventContent = "任务延期至" + assignmentBean.getEndDate();
                break;
            case 8:
                eventContent = "负责人修改为" + assignmentBean.getHeader();
                break;
            case 9:
                eventContent = "进度修改为" + (int)assignmentBean.getPercent()*100+"%";
                break;
            case 10:
                eventContent = "审核未通过" + assignmentBean.getComment();
                break;
            default:
                eventType = 100;
                eventContent = "任务修改";
        }

        EventBean eventBean = new EventBean();
        eventBean.setAssignmentId(assignmentBean.getId());
        eventBean.setEventContent(eventContent);
        eventBean.setEventType(eventType);
        eventBean.setOperator(this.getShiroService().getCurrentUserId());

        eventBeanDao.save(eventBean);
    }

    /**
     * 发送new消息通知
     *
     * @param bean
     */

    private void postNewAssignmentEvent(AssignmentBean bean) {
        try {
            eventAdmin = JNDIHelper.getJNDIServiceForName("org.osgi.service.event.EventAdmin");
        } catch (IOException e) {
            e.printStackTrace();
        }
        Dictionary properties = new Hashtable();
        properties.put("userName", bean.getUserName());//布置人
        properties.put("head", bean.getHead());//负责人
        properties.put("taskName", bean.getTitle());//任务名称
        Event osgi_event = new Event(Const.SCHEDULE_ASSIGNMENT_NEW_TOPIC, properties);
        System.out.println("Schedule User name: " + bean.getUserName() + " message is sent!");
        eventAdmin.postEvent(osgi_event);
    }

    /**
     * 处理任务状态修改
     *
     * @param entity
     * @param status
     */
    @Override
    public void beforeUpdateEntity(AssignmentBean entity, JsonStatus status) {
        AssignmentBean oldEntity = dao.get(entity.getId());
        if (oldEntity.getState() != (entity.getState()))
            postChangeAssignmentEvent(entity, oldEntity.getState());
        super.beforeUpdateEntity(entity, status);
    }

    /**
     * 发送状态修改消息通知
     *
     * @param bean
     */
    private void postChangeAssignmentEvent(AssignmentBean bean, Integer oldState) {
        try {
            eventAdmin = JNDIHelper.getJNDIServiceForName("org.osgi.service.event.EventAdmin");
        } catch (IOException e) {
            e.printStackTrace();
        }
        Dictionary properties = new Hashtable();
        properties.put("userName", bean.getUserName());//布置人
        properties.put("head", bean.getHead());//负责人
        properties.put("taskName", bean.getTitle());//任务名称
        String strNewState = scheduleDictBeanService.getByTypeAndValue("任务状态", bean.getState()).getLabel();
        properties.put("state", strNewState);//任务状态

        String strOldState = scheduleDictBeanService.getByTypeAndValue("任务状态", oldState).getLabel();
        properties.put("oldState", strOldState);//任务旧状态

        Event osgi_event = new Event(Const.SCHEDULE_ASSIGNMENT_CHANGE_TOPIC, properties);
        System.out.println("User name: " + bean.getUserName() + " change status message is sent!");
        eventAdmin.postEvent(osgi_event);
    }

    public IUserBeanService getUserBeanService() {
        return userBeanService;
    }

    public void setUserBeanService(IUserBeanService userBeanService) {
        this.userBeanService = userBeanService;
    }

    public void setProgressBeanDao(IProgressBeanDao progressBeanDao) {
        this.progressBeanDao = progressBeanDao;
    }

    public void setEventBeanDao(IEventBeanDao eventBeanDao) {
        this.eventBeanDao = eventBeanDao;
    }

    public void setReadingBeanDao(IReadingBeanDao readingBeanDao) {
        this.readingBeanDao = readingBeanDao;
    }

    public void setScheduleDictBeanService(IScheduleDictBeanService scheduleDictBeanService) {
        this.scheduleDictBeanService = scheduleDictBeanService;
    }
}
