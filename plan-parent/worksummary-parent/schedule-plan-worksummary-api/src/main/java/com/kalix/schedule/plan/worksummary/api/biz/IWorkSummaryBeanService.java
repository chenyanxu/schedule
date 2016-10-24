package com.kalix.schedule.plan.worksummary.api.biz;

import com.kalix.framework.core.api.biz.IBizService;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.schedule.plan.worksummary.entities.WorkSummaryBean;

/**
 * @类描述：应用服务接口.
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public interface IWorkSummaryBeanService extends IBizService<WorkSummaryBean> {
    //在此添加新的业务方法

    /**
     *  查询个人工作总结
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    JsonData getSelfEntityByQuery(Integer page, Integer limit, String jsonStr, String sort);
}
