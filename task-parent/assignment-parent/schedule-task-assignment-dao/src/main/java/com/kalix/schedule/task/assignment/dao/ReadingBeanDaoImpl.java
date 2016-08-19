package com.kalix.schedule.task.assignment.dao;

import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.task.assignment.api.dao.IReadingBeanDao;
import com.kalix.schedule.task.assignment.entities.ReadingBean;

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
public class ReadingBeanDaoImpl extends GenericDao<ReadingBean, Long> implements IReadingBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-task-assignment-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }
    //todo add custom query

}
