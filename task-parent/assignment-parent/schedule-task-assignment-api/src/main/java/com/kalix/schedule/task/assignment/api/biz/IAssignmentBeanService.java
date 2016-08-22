package com.kalix.schedule.task.assignment.api.biz;

import com.kalix.framework.core.api.biz.IBizService;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.schedule.task.assignment.entities.AssignmentBean;

/**
 * @类描述：应用服务接口.
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public interface IAssignmentBeanService extends IBizService<AssignmentBean> {
    //在此添加新的业务方法
    JsonData getSelfEntityByQuery(Integer page, Integer limit, String jsonStr);
    JsonData getAllProgressEntity(long assignmentId);
    JsonData getAllReadingEntity(long assignmentId);
    JsonData getAllEventEntity(long assignmentId);
}
