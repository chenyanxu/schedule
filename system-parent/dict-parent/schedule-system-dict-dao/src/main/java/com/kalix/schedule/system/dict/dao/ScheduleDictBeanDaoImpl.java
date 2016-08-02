package com.kalix.schedule.system.dict.dao;

import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.system.dict.api.dao.IScheduleDictBeanDao;
import com.kalix.schedule.system.dict.entities.ScheduleDictBean;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class ScheduleDictBeanDaoImpl extends GenericDao<ScheduleDictBean, Long> implements IScheduleDictBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-system-dict-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }
}
