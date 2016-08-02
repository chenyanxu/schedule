package com.kalix.schedule.plan.personalplan.dao;

import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.plan.personalplan.api.dao.IPersonalPlanBeanDao;
import com.kalix.schedule.plan.personalplan.entities.PersonalPlanBean;

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
public class PersonalPlanBeanDaoImpl extends GenericDao<PersonalPlanBean, Long> implements IPersonalPlanBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-plan-personalplan-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }
    //todo add custom query

}
