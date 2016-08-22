package com.kalix.schedule.plan.worksummary.dao;

import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.plan.worksummary.api.dao.IWorkSummaryBeanDao;
import com.kalix.schedule.plan.worksummary.entities.WorkSummaryBean;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * @类描述：
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class WorkSummaryBeanDaoImpl extends GenericDao<WorkSummaryBean, Long> implements IWorkSummaryBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-plan-worksummary-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }
    //todo add custom query

}
