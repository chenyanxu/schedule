package com.kalix.schedule.plan.personalplan.api.biz;

import com.kalix.framework.core.api.biz.IBizService;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.schedule.plan.personalplan.entities.PersonalPlanBean;

/**
 * @类描述：应用服务接口.
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public interface IPersonalPlanBeanService extends IBizService<PersonalPlanBean> {
    //在此添加新的业务方法

    /**
     * 查询个人的个人计划
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    JsonData getSelfEntityByQuery(Integer page, Integer limit, String jsonStr);
}
