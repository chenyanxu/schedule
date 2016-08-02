package com.kalix.schedule.plan.departmentplan.dao;

import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.plan.departmentplan.api.dao.IDepartmentPlanBeanDao;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;

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
public class DepartmentPlanBeanDaoImpl extends GenericDao<DepartmentPlanBean, Long> implements IDepartmentPlanBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-plan-departmentplan-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }
    //todo add custom query

}
