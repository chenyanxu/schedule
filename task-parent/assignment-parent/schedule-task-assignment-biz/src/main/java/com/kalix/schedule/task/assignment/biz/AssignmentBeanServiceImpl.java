package com.kalix.schedule.task.assignment.biz;

import com.kalix.admin.core.api.biz.IUserBeanService;
import com.kalix.common.message.api.Const;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.BeanUtil;
import com.kalix.framework.core.util.JNDIHelper;
import com.kalix.framework.core.util.SerializeUtil;
//import com.kalix.schedule.plan.departmentplan.api.biz.IDepartmentPlanBeanService;
//import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;
import com.kalix.middleware.statemachine.api.biz.IStatemachineService;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentTemplateBeanService;
import com.kalix.schedule.task.assignment.api.biz.ITemplateBeanService;
import com.kalix.schedule.task.assignment.entities.*;
import com.kalix.schedule.system.dict.api.biz.IScheduleDictBeanService;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentBeanService;
import com.kalix.schedule.task.assignment.api.dao.IAssignmentBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IEventBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IProgressBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IReadingBeanDao;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventAdmin;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

/**
 * @类描述：
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class AssignmentBeanServiceImpl extends ShiroGenericBizServiceImpl<IAssignmentBeanDao, AssignmentBean> implements IAssignmentBeanService {
    private IStatemachineService statemachineService;

    public void setStatemachineService(IStatemachineService statemachineService) {
        this.statemachineService = statemachineService;
    }

    private JsonStatus jsonStatus = new JsonStatus();
    private IUserBeanService userBeanService;
    private EventAdmin eventAdmin;

    public AssignmentBeanServiceImpl() {
        super.init(AssignmentBean.class.getName());
    }

    private IScheduleDictBeanService scheduleDictBeanService;
    private ITemplateBeanService templateBeanService;
    private IAssignmentTemplateBeanService assignmentTemplateBeanService;
    //private IDepartmentPlanBeanService departmentplanBeanService;
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
        condition += " and (sourceType = 0 or sourceType=2) order by creationDate desc";

        List comboList = dao.findByNativeSql("select * from " + dao.getTableName() + condition, AssignmentBean.class, null);

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
        String condition=" where 1=1 ";
        for (Map.Entry<String, String> entry : jsonMap.entrySet()) {
            if (entry.getValue() != null && !entry.getValue().equals("")) {
                condition = condition + " and " + entry.getKey() + " = " + entry.getValue();
            }
        }

        Long userId = this.getShiroService().getCurrentUserId();
        condition += " and (userId = " + userId + " or head = " + userId + " or participant like '%" + userId + "%') order by creationDate desc";

        //查找任务布置人或者任务负责人或者参与人是当前用户的数据
        JsonData jsonData = dao.findByNativeSql("select * from " + dao.getTableName() + condition,page,limit,AssignmentBean.class,null);

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
     * 添加任务
     *
     * @param entity
     * @return
     */
    @Override
    @Transactional
    public JsonStatus saveEntity(AssignmentBean entity) {
        // 获取登录用户id及用户名
        Long userId = this.getShiroService().getCurrentUserId();
        String userName = this.getShiroService().getCurrentUserRealName();

        // 先判断是否是从计划模板创建的任务
        if(entity.getTemplateId() != 0){//根据模板生成部门计划，部门计划下的任务
            jsonStatus.setSuccess(true);
            // 查询该计划模板
            TemplateBean templateBean = templateBeanService.getEntity(entity.getTemplateId());
            // 利用计划模板新建计划

            // 查看该计划下是否有任务
            JsonData jsonData = assignmentTemplateBeanService.getAllEntityByQuery(1,100,"{planTemplateId:" + templateBean.getId() + "}");
            List<AssignmentTemplateBean> assignmentTemplateList = jsonData.getData();
            for(int i = 0; i < assignmentTemplateList.size(); i++){
                Mapper mapper = new DozerBeanMapper();

                AssignmentBean newAssignment = mapper.map(assignmentTemplateList.get(i), AssignmentBean.class);
                newAssignment.setId(0L);
                newAssignment.setPercentNumber(0);
                newAssignment.setBeginDate(new Date());

                Date endDate = new Date();
                newAssignment.setEndDate(new Date(endDate.getTime() + assignmentTemplateList.get(i).getTaskDate()*24*60*60*1000));
                newAssignment.setPercent(0f);
                // 添加时，写入用户id及用户名
                newAssignment.setUserId(userId);
                newAssignment.setUserName(userName);
                newAssignment.setCreationDate(new Date());
                newAssignment.setUpdateDate(new Date());

                postNewAssignmentEvent(newAssignment);
                //新增部门计划下的任务
                super.saveEntity(newAssignment);
            }

//            Mapper mapper = new DozerBeanMapper();
//            DepartmentPlanBean departmentPlanBean = mapper.map(templateBean,DepartmentPlanBean.class);
//            departmentPlanBean.setId(0);
//            departmentPlanBean.setUserName(userName);
//            departmentPlanBean.setUserId(userId);
//            departmentPlanBean.setBeginDate(new Date());
//            Date endDate = new Date();
//            departmentPlanBean.setEndDate(new Date(endDate.getTime() + templateBean.getPlanDate()*24*60*60*1000));
//            departmentPlanBean.setCreationDate(new Date());
//            departmentPlanBean.setUpdateDate(new Date());
            //新增部门计划
            //jsonStatus = departmentplanBeanService.saveEntity(departmentPlanBean);
        }else {
            // 添加时，写入用户id及用户名
            entity.setUserId(userId);
            entity.setUserName(userName);

            //设置进度
            if (entity != null) {
                entity.setPercent(entity.getPercent());
            } else {
                entity.setPercent(0f);
            }
            postNewAssignmentEvent(entity);

            jsonStatus = super.saveEntity(entity);
            //保存任务事件
            saveEventEntity(entity);
        }

        return jsonStatus;
    }

    /**
     * 修改任务
     *
     * @param entity
     * @return
     */
    @Override
    @Transactional
    public JsonStatus updateEntity(AssignmentBean entity) {
        //保存任务事件
        saveEventEntity(entity);
        //设置进度
        if (entity != null) {
            entity.setPercent(entity.getPercent());
        } else {
            entity.setPercent(0f);
        }


        AssignmentBean oldEntity = dao.get(entity.getId());
        if (entity.getState() != null && oldEntity.getState() != (entity.getState())) {
            String strNewState = scheduleDictBeanService.getByTypeAndValue("任务状态", entity.getState()).getLabel();
            String strOldState = scheduleDictBeanService.getByTypeAndValue("任务状态", oldEntity.getState()).getLabel();

            //statemachineService.processFSM(this.getClass().getClassLoader().getResourceAsStream("state-machine.xml"), strOldState, strNewState);
            statemachineService.initFSM(this.getClass().getClassLoader().getResourceAsStream("state-machine.xml"), strOldState);
            statemachineService.processFSM(strNewState);
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
    public JsonData getAllProgressEntity(Long assignmentId) {
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
    public JsonData getAllReadingEntity(Long assignmentId) {
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
    public JsonData getAllEventEntity(Integer page, Integer limit,Long assignmentId) {
        JsonData jsonData = eventBeanDao.findByNativeSql("select * from " + eventBeanDao.getTableName() +" ob where ob.assignmentId=?1 order by ob.creationDate desc", page,limit,EventBean.class,assignmentId);
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
    public JsonData getAllTaskEntityByDepartmentPlanId(Integer page, Integer limit,Long departmentPlanId) {
        JsonData jsonData = dao.findByNativeSql("select * from " + dao.getTableName() + " ob where ob.sourceId=?1 order by ob.creationDate desc", page,limit,AssignmentBean.class,departmentPlanId);
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
        int eventType = 100;
        if(assignmentBean.getEventType() != null) {
            eventType = assignmentBean.getEventType();
        }
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
                eventContent = "进度修改为" + ((int)(assignmentBean.getPercent()*100))+"%";
                break;
            case 10:
                eventContent = "审核未通过" + assignmentBean.getComment();
                break;
            case 11:
                eventContent = "督办了一个任务";
                postSuperviseAssignmentEvent(assignmentBean);
                break;
            default:
                eventType = 100;
                eventContent = "修改了一个任务";
        }

        EventBean eventBean = new EventBean();
        eventBean.setAssignmentId(assignmentBean.getId());
        eventBean.setEventContent(eventContent);
        eventBean.setEventType((long)eventType);
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
        properties.put("participant",bean.getParticipant());//参与人
        Event osgi_event = new Event(Const.SCHEDULE_ASSIGNMENT_NEW_TOPIC, properties);
        System.out.println("Schedule User name: " + bean.getUserName() + " message is sent!");
        eventAdmin.postEvent(osgi_event);
    }

    /**
     * 发送new消息通知
     *
     * @param bean
     */
    private void postSuperviseAssignmentEvent(AssignmentBean bean) {
        try {
            eventAdmin = JNDIHelper.getJNDIServiceForName("org.osgi.service.event.EventAdmin");
        } catch (IOException e) {
            e.printStackTrace();
        }

        String info;
        Date endDate = bean.getEndDate();
        Date nowDate = new Date();
        if(nowDate.compareTo(endDate) > 0){
            info = "该任务已经逾期，请尽快处理";
        }else{
            info = "请抓紧任务进度";
        }
        Dictionary properties = new Hashtable();
        properties.put("userName", bean.getUserName());//布置人
        properties.put("head", bean.getHead());//负责人
        properties.put("taskName", bean.getTitle());//任务名称
        properties.put("info", info);//任务名称
        Event osgi_event = new Event(Const.SCHEDULE_ASSIGNMENT_SUPERVISE_TOPIC, properties);
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
        if (entity.getState() != null && oldEntity.getState() != (entity.getState()))
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
        properties.put("userId", bean.getUserId());//布置人ID
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

    public void setTemplateBeanService(ITemplateBeanService templateBeanService) {
        this.templateBeanService = templateBeanService;
    }

    public void setAssignmentTemplateBeanService(IAssignmentTemplateBeanService assignmentTemplateBeanService) {
        this.assignmentTemplateBeanService = assignmentTemplateBeanService;
    }

//    public void setDepartmentplanBeanService(IDepartmentPlanBeanService departmentplanBeanService) {
//        this.departmentplanBeanService = departmentplanBeanService;
//    }
}
