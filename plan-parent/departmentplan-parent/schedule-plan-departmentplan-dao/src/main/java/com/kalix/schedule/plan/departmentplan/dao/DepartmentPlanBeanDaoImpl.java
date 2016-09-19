package com.kalix.schedule.plan.departmentplan.dao;

import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.plan.departmentplan.api.dao.IDepartmentPlanBeanDao;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

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

    /**
     * 查询指定id内的个人计划信息
     *
     * @param id
     * @return
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<DepartmentPlanBean> findById(List<Long> id) {
        if (id != null && !id.isEmpty()) {
            return (List<DepartmentPlanBean>) this.find("select ob from DepartmentPlanBean ob where ob.id in (?1) ", id);
        } else {
            return new ArrayList<>();
        }
    }
}
