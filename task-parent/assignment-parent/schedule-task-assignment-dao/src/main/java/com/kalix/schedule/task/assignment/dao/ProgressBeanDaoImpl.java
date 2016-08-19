package com.kalix.schedule.task.assignment.dao;

import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.task.assignment.api.dao.IProgressBeanDao;
import com.kalix.schedule.task.assignment.entities.ProgressBean;

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
public class ProgressBeanDaoImpl extends GenericDao<ProgressBean, Long> implements IProgressBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-task-assignment-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }
    //todo add custom query

}
