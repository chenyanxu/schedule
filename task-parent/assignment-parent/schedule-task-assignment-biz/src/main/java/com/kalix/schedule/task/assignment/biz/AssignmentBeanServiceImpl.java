package com.kalix.schedule.task.assignment.biz;

import com.kalix.admin.core.api.biz.IUserBeanService;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.BeanUtil;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentBeanService;
import com.kalix.schedule.task.assignment.api.dao.IAssignmentBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IEventBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IProgressBeanDao;
import com.kalix.schedule.task.assignment.api.dao.IReadingBeanDao;
import com.kalix.schedule.task.assignment.entities.AssignmentBean;
import com.kalix.schedule.task.assignment.entities.EventBean;
import com.kalix.schedule.task.assignment.entities.ProgressBean;
import com.kalix.schedule.task.assignment.entities.ReadingBean;

import java.util.ArrayList;
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
    public AssignmentBeanServiceImpl() {
        super.init(AssignmentBean.class.getName());
    }

    private IProgressBeanDao progressBeanDao;
    private IEventBeanDao eventBeanDao;
    private IReadingBeanDao readingBeanDao;
    @Override
    public JsonData getAllEntityByQuery(Integer page, Integer limit, String jsonStr){
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        Long userId = this.getShiroService().getCurrentUserId();
        String userName = this.getShiroService().getCurrentUserRealName();
        jsonMap.put("userId",String.valueOf(userId));
        jsonMap.put("userName",userName);

        //查找任务布置人是当前用户的数据
        String newJsonStr = SerializeUtil.serializeJson(jsonMap);
        JsonData jsonData = super.getAllEntityByQuery(page,limit,newJsonStr);
        List creationList = jsonData.getData();

        //查找任务负责人是当前用户的数据
        jsonMap.clear();
        jsonMap.put("head",String.valueOf(userId));
        newJsonStr = SerializeUtil.serializeJson(jsonMap);
        jsonData = super.getAllEntityByQuery(page,limit,newJsonStr);
        List headList = jsonData.getData();

        //查找任务参与人是当前用户的数据
        jsonMap.clear();
        jsonMap.put("participant",String.valueOf(userId));
        newJsonStr = SerializeUtil.serializeJson(jsonMap);
        jsonData = super.getAllEntityByQuery(page,limit,newJsonStr);
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
        //List beans = jsonData.getData();
        List ids= BeanUtil.getBeanFieldValueList(totalList,"head");
        List values=this.userBeanService.getFieldValuesByIds(ids.toArray(),"name");
        BeanUtil.setBeanListFieldValues(totalList,"header",values);

        jsonData.setTotalCount((long)totalList.size());
        jsonData.setData(totalList);
        return jsonData;
    }

    @Override
    public JsonStatus saveEntity(AssignmentBean entity) {
        Long userId = this.getShiroService().getCurrentUserId();
        String userName = this.getShiroService().getCurrentUserRealName();

        entity.setUserId(userId);
        entity.setUserName(userName);

        return super.saveEntity(entity);
    }


    @Override
    public JsonData getAllProgressEntity(long assignmentId) {
        JsonData jsonData = new JsonData();
        List<ProgressBean> progressList = progressBeanDao.find("select ob from ProgressBean ob where ob.assignmentId = ?1", assignmentId);
        jsonData.setTotalCount((long)progressList.size());
        jsonData.setData(progressList);

        return jsonData;
    }

    @Override
    public JsonData getAllReadingEntity(long assignmentId) {
        JsonData jsonData = new JsonData();
        List<ReadingBean> readingList = readingBeanDao.find("select ob from ReadingBean ob where ob.assignmentId=?1", assignmentId);
        jsonData.setTotalCount((long)readingList.size());
        jsonData.setData(readingList);

        return jsonData;
    }

    @Override
    public JsonData getAllEventEntity(long assignmentId) {
        JsonData jsonData = new JsonData();
        List<EventBean> eventList = eventBeanDao.find("select ob from EventBean ob where ob.assignmentId=?1", assignmentId);
        jsonData.setTotalCount((long)eventList.size());
        jsonData.setData(eventList);

        return jsonData;
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
}
