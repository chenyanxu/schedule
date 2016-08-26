package com.kalix.schedule.task.assignment.biz;

import com.kalix.admin.core.api.biz.IUserBeanService;
import com.kalix.admin.core.api.dao.IOrganizationBeanDao;
import com.kalix.admin.core.entities.OrganizationBean;
import com.kalix.common.message.api.Const;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.api.web.model.BaseDTO;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.Assert;
import com.kalix.framework.core.util.BeanUtil;
import com.kalix.framework.core.util.JNDIHelper;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.system.dict.api.biz.IScheduleDictBeanService;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentBeanService;
import com.kalix.schedule.task.assignment.api.dao.IAssignmentBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IEventBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IProgressBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IReadingBeanDao;
import com.kalix.schedule.task.assignment.api.query.AssignmentColumnChartDTO;
import com.kalix.schedule.task.assignment.api.query.AssignmentPieChartDTO;
import com.kalix.schedule.task.assignment.entities.AssignmentBean;
import com.kalix.schedule.task.assignment.entities.EventBean;
import com.kalix.schedule.task.assignment.entities.ProgressBean;
import com.kalix.schedule.task.assignment.entities.ReadingBean;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventAdmin;

import java.io.IOException;
import java.math.BigDecimal;
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
    private IOrganizationBeanDao organizationBeanDao;

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
        //String userName = this.getShiroService().getCurrentUserRealName();
        jsonMap.put("userId", String.valueOf(userId));
        //jsonMap.put("userName",userName);

        //查找任务布置人是当前用户的数据
        String newJsonStr = SerializeUtil.serializeJson(jsonMap);
        JsonData jsonData = super.getAllEntityByQuery(page, limit, newJsonStr);
        List creationList = jsonData.getData();

        //查找任务负责人是当前用户的数据
        jsonMap.clear();
        jsonMap.put("head", String.valueOf(userId));
        newJsonStr = SerializeUtil.serializeJson(jsonMap);
        jsonData = super.getAllEntityByQuery(page, limit, newJsonStr);
        List headList = jsonData.getData();

        //查找任务参与人是当前用户的数据
        jsonMap.clear();
        jsonMap.put("participant", String.valueOf(userId));
        newJsonStr = SerializeUtil.serializeJson(jsonMap);
        jsonData = super.getAllEntityByQuery(page, limit, newJsonStr);
        List participantList = jsonData.getData();

        List totalList = new ArrayList<>();
        totalList.addAll(creationList);
        //去重复数据
        totalList.removeAll(headList);
        totalList.addAll(headList);
        //去重复数据
        totalList.removeAll(participantList);
        totalList.addAll(participantList);

        //翻译任务负责人
        List ids = BeanUtil.getBeanFieldValueList(totalList, "head");
        List values = this.userBeanService.getFieldValuesByIds(ids.toArray(), "name");
        BeanUtil.setBeanListFieldValues(totalList, "header", values);

        jsonData.setTotalCount((long) totalList.size());
        jsonData.setData(totalList);
        return jsonData;
    }

    /**
     * 根据登录用户的信息，查询任务
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    @Override
    public JsonData getColumnChartData(Integer page, Integer limit, String jsonStr){
        JsonData jsonData = new JsonData();
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        String orgCode = null;
        String condition = " where 1=1 ";
        for (Map.Entry<String, String> entry : jsonMap.entrySet()) {
            if(entry.getValue() != null && !entry.getValue().equals("")) {
                //获取前台传入的orgCode
                if(entry.getKey().equals("orgCode")){
                    orgCode = entry.getValue();
                    condition = condition + " and " + entry.getKey() + " like '" + entry.getValue() + "%'";
                }else{
                    condition = condition + " and " + entry.getKey() + " = " + entry.getValue();
                }
            }
        }
        //必须有orgCode作为查询条件
        if(orgCode == null){
            orgCode = "001";
            condition = condition + " and orgCode like '001%'";
        }

        //1、先查找该中心代码所直属的部门信息
        List<OrganizationBean> organizatioBeen = organizationBeanDao.find("select ob from OrganizationBean ob where ob.code like ?1 order by ob.name",orgCode+"___");

        //2、获得查询的sql语句
        String sql = getNativeQueryStr();

        //获得返回的结果类
        Class<? extends BaseDTO> cls = getResultClass();
        Assert.notNull(cls, "返回查询结果类不能为空.");
        //sql = sql + condition;

        //3、循环查找该中心代码下的任务数，放到chartList中
        List<AssignmentColumnChartDTO> chartList = new ArrayList<>();
        for(int i = 0; i < organizatioBeen.size(); i++){
            String tmpSql = sql+" where orgCode like '"+ organizatioBeen.get(i).getCode() + "%'";
            //sql = sql + " where orgCode like '"+ organizatioBeen.get(i).getCode() + "%'";
            List<AssignmentColumnChartDTO> tmpList = dao.findByNativeSql(tmpSql, AssignmentColumnChartDTO.class,"");
            //如果数据为空，那么初始为0
            AssignmentColumnChartDTO tmpDTO = new AssignmentColumnChartDTO();
            tmpDTO.setOrgName(organizatioBeen.get(i).getName());
            tmpDTO.setTotal(tmpList.get(0).getTotal());
            tmpDTO.setWaiting(tmpList.get(0).getWaiting() == null?0:tmpList.get(0).getWaiting());
            tmpDTO.setReject(tmpList.get(0).getReject() == null?0:tmpList.get(0).getReject());
            tmpDTO.setComplete(tmpList.get(0).getComplete()==null?0:tmpList.get(0).getComplete());
            tmpDTO.setFinish(tmpList.get(0).getFinish() == null?0:tmpList.get(0).getFinish());
            tmpDTO.setFailure(tmpList.get(0).getFailure() == null?0:tmpList.get(0).getFailure());
            tmpDTO.setCancel(tmpList.get(0).getCancel() == null?0:tmpList.get(0).getCancel());

            chartList.add(tmpDTO);
        }

        //4、查询该中心下的任务数
        String tmpSql = "select orgName,count(*) as total," +
                "sum(case when state=0 then 1 else 0 end) as waiting," +
                "sum(case when state=1 then 1 else 0 end) as reject," +
                "sum(case when state=2 then 1 else 0 end) as process," +
                "sum(case when state=3 then 1 else 0 end) as complete," +
                "sum(case when state=4 then 1 else 0 end) as finish," +
                "sum(case when state=5 then 1 else 0 end) as failure," +
                "sum(case when state=6 then 1 else 0 end) as cancel " +
                "from schedule_assignment " +
                " where orgCode = '" + orgCode + "' group by orgName";
        List<AssignmentColumnChartDTO> tmpList = dao.findByNativeSql(tmpSql, AssignmentColumnChartDTO.class,"");
        if(tmpList.size() != 0){
            //如果数据为空，那么初始为0
            AssignmentColumnChartDTO tmpDTO = new AssignmentColumnChartDTO();
            tmpDTO.setOrgName(tmpList.get(0).getOrgName());
            tmpDTO.setTotal(tmpList.get(0).getTotal());
            tmpDTO.setWaiting(tmpList.get(0).getWaiting() == null?0:tmpList.get(0).getWaiting());
            tmpDTO.setReject(tmpList.get(0).getReject() == null?0:tmpList.get(0).getReject());
            tmpDTO.setComplete(tmpList.get(0).getComplete()==null?0:tmpList.get(0).getComplete());
            tmpDTO.setFinish(tmpList.get(0).getFinish() == null?0:tmpList.get(0).getFinish());
            tmpDTO.setFailure(tmpList.get(0).getFailure() == null?0:tmpList.get(0).getFailure());
            tmpDTO.setCancel(tmpList.get(0).getCancel() == null?0:tmpList.get(0).getCancel());

            chartList.add(tmpDTO);
        }

        // 传到前台的id
        for(int i = 0; i < chartList.size(); i++){
            chartList.get(i).setId(i);
        }
        //chartJsonData.setFields(new String[]{"orgName","total","waiting","reject","process","complete","finish","failure","cancel"});
        jsonData.setTotalCount((long)chartList.size());
        jsonData.setData(chartList);

        return jsonData;
    }

    @Override
    public JsonData getPieChartData(Integer page, Integer limit, String jsonStr){
        JsonData jsonData = new JsonData();
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        String orgCode = null;
        String condition = " where 1=1 ";
        for (Map.Entry<String, String> entry : jsonMap.entrySet()) {
            if(entry.getValue() != null && !entry.getValue().equals("")) {
                //获取前台传入的orgCode
                if(entry.getKey().equals("orgCode")){
                    orgCode = entry.getValue();
                    condition = condition + " and " + entry.getKey() + " like '" + entry.getValue() + "%'";
                }else{
                    condition = condition + " and " + entry.getKey() + " = " + entry.getValue();
                }
            }
        }

        //必须有orgCode作为查询条件
        if(orgCode == null){
            orgCode = "001";
            condition = condition + " and orgCode like '001%'";
        }

        //1、先查询出人数总数
        float total = dao.findByNativeSql("select * from schedule_assignment " + condition,AssignmentBean.class,null).size();

        //2、先查找该中心代码所直属的部门信息
        List<OrganizationBean> organizatioBeen = organizationBeanDao.find("select ob from OrganizationBean ob where ob.code like ?1 order by ob.name",orgCode+"___");

        //3、循环查找该中心代码下的任务数，放到chartList中
        List<AssignmentPieChartDTO> chartList = new ArrayList<>();
        for(int i = 0; i < organizatioBeen.size(); i++){
            String tmpSql = "select * from schedule_assignment "+condition+" and orgCode like '"+ organizatioBeen.get(i).getCode() + "%'";
            List<AssignmentBean> tmpList = dao.findByNativeSql(tmpSql, AssignmentBean.class,"");
            //如果数据为空,不加入
            if(tmpList.size() != 0) {
                float ft = (tmpList.size() / total)*100;
                int   scale  =   2;//设置小数位数
                int   roundingMode  =  4;//表示四舍五入，可以选择其他舍值方式，例如去尾
                BigDecimal bd  =   new BigDecimal((double)ft);
                bd   =  bd.setScale(scale,roundingMode);
                ft   =  bd.floatValue();
                AssignmentPieChartDTO tmpDTO = new AssignmentPieChartDTO();
                tmpDTO.setOrgName(tmpList.get(i).getOrgName());
                tmpDTO.setPercent(ft);
                chartList.add(tmpDTO);
            }
        }

        //4、查找本单位的
        String tmpSql = "select * from schedule_assignment where orgCode=?1";
        List<AssignmentBean> tmpList = dao.findByNativeSql(tmpSql, AssignmentBean.class,orgCode);
        if(tmpList.size() != 0) {
            float ft = (tmpList.size() / total)*100;
            int   scale  =   2;//设置小数位数
            int   roundingMode  =  4;//表示四舍五入，可以选择其他舍值方式，例如去尾
            BigDecimal   bd  =   new BigDecimal((double)ft);
            bd   =  bd.setScale(scale,roundingMode);
            ft   =  bd.floatValue();
            AssignmentPieChartDTO tmpDTO = new AssignmentPieChartDTO();
            tmpDTO.setOrgName(organizatioBeen.get(0).getName());
            tmpDTO.setPercent(ft);
            chartList.add(tmpDTO);
        }

        // 传到前台的id
        for(int i = 0; i < chartList.size(); i++){
            chartList.get(i).setId(i);
        }
        jsonData.setTotalCount((long)chartList.size());
        jsonData.setData(chartList);

        return jsonData;
    }

    @Override
    protected String getNativeQueryStr() {
        return "select count(*) as total," +
                "sum(case when state=0 then 1 else 0 end) as waiting," +
                "sum(case when state=1 then 1 else 0 end) as reject," +
                "sum(case when state=2 then 1 else 0 end) as process," +
                "sum(case when state=3 then 1 else 0 end) as complete," +
                "sum(case when state=4 then 1 else 0 end) as finish," +
                "sum(case when state=5 then 1 else 0 end) as failure," +
                "sum(case when state=6 then 1 else 0 end) as cancel " +
                "from schedule_assignment ";
    }

    @Override
    protected Class<? extends BaseDTO> getResultClass() {
        return AssignmentColumnChartDTO.class;
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
            entity.setPercent(entity.getPercent() / 100.0f);
        } else {
            entity.setPercent(0f);
        }
        postNewAssignmentEvent(entity);
        return super.saveEntity(entity);
    }

    /**
     * 修改任务
     *
     * @param entity
     * @return
     */
    @Override
    public JsonStatus updateEntity(AssignmentBean entity) {
        //设置进度
        if (entity != null) {
            entity.setPercent(entity.getPercent() / 100.0f);
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
    public JsonData getAllEventEntity(long assignmentId) {
        JsonData jsonData = new JsonData();
        List<EventBean> eventList = eventBeanDao.find("select ob from EventBean ob where ob.assignmentId=?1", assignmentId);
        jsonData.setTotalCount((long) eventList.size());
        jsonData.setData(eventList);

        return jsonData;
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
        String strNewState=scheduleDictBeanService.getByTypeAndValue("任务状态",bean.getState()).getLabel();
        properties.put("state", strNewState);//任务状态

        String strOldState=scheduleDictBeanService.getByTypeAndValue("任务状态",oldState).getLabel();
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

    public void setOrganizationBeanDao(IOrganizationBeanDao organizationBeanDao) {
        this.organizationBeanDao = organizationBeanDao;
    }

    public void setScheduleDictBeanService(IScheduleDictBeanService scheduleDictBeanService) {
        this.scheduleDictBeanService = scheduleDictBeanService;
    }
}
