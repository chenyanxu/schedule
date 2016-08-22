package com.kalix.schedule.plan.workreport.dao;

import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.plan.workreport.api.dao.IWorkReportBeanDao;
import com.kalix.schedule.plan.workreport.entities.WorkReportBean;

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
public class WorkReportBeanDaoImpl extends GenericDao<WorkReportBean, Long> implements IWorkReportBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-plan-workreport-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }
    //todo add custom query

}
