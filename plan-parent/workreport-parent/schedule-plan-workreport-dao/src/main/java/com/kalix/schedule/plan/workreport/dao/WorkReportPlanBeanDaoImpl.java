package com.kalix.schedule.plan.workreport.dao;

import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.plan.workreport.api.dao.IWorkReportPlanBeanDao;
import com.kalix.schedule.plan.workreport.entities.WorkReportPlanBean;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * @类描述：
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class WorkReportPlanBeanDaoImpl extends GenericDao<WorkReportPlanBean, Long> implements IWorkReportPlanBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-plan-workreport-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }

    /**
     * 根据工作汇报id查询工作汇报内的计划信息
     *
     * @param id
     * @return
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<WorkReportPlanBean> findPlanByWorkReportId(Long id) {
        return (List<WorkReportPlanBean>) this.find("select ob from WorkReportPlanBean ob where ob.workreportId = ?1", id);
    }
}
