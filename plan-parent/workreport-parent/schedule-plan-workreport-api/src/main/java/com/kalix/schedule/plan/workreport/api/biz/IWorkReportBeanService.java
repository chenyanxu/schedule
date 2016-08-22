package com.kalix.schedule.plan.workreport.api.biz;

import com.kalix.framework.core.api.biz.IBizService;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.schedule.plan.workreport.entities.WorkReportBean;

/**
 * @类描述：应用服务接口.
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public interface IWorkReportBeanService extends IBizService<WorkReportBean> {
    //在此添加新的业务方法

    /**
     * 查找工作汇报关联的个人计划
     *
     * @param id
     * @return
     */
    JsonData getPersonalPlanByWorkReportId(long id);


    /**
     * 查找工作汇报关联的部门计划
     *
     * @param id
     * @return
     */
    JsonData getDepartmentPlanByWorkReportId(long id);
}
