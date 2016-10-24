package com.kalix.schedule.plan.departmentplan.api.biz;

import com.kalix.framework.core.api.biz.IBizService;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;

/**
 * @类描述：应用服务接口.
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public interface IDepartmentPlanBeanService extends IBizService<DepartmentPlanBean> {
    //在此添加新的业务方法

    /**
     * 查询个人的部门计划
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    JsonData getSelfEntityByQuery(Integer page, Integer limit, String jsonStr, String sort);

    /**
     * 查询个人的部门计划,提供给combobox使用,已经归档的任务不出现在combobox中
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    JsonData getDepPlanCombox(Integer page, Integer limit, String jsonStr);
}
