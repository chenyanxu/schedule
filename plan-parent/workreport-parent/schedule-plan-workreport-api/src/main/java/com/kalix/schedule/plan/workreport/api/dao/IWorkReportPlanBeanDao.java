package com.kalix.schedule.plan.workreport.api.dao;

import com.kalix.framework.core.api.dao.IGenericDao;
import com.kalix.schedule.plan.workreport.entities.WorkReportPlanBean;

import java.util.List;

/**
 * @类描述：DAO接口
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public interface IWorkReportPlanBeanDao extends IGenericDao<WorkReportPlanBean, Long> {
    //在此添加新的DAO方法


    /**
     * 根据工作汇报id查询工作汇报内的计划信息
     *
     * @param id
     * @return
     */
    List<WorkReportPlanBean> findPlanByWorkReportId(Long id);
}
