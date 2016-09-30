package com.kalix.schedule.plan.template.dao;

import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.plan.template.api.dao.IAssignmentTemplateBeanDao;
import com.kalix.schedule.plan.template.entities.AssignmentTemplateBean;

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
public class AssignmentTemplateBeanDaoImpl extends GenericDao<AssignmentTemplateBean, Long> implements IAssignmentTemplateBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-plan-template-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }
    //todo add custom query

}
