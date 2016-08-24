package com.kalix.schedule.plan.departmentplan.api.dao;

import com.kalix.framework.core.api.dao.IGenericDao;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;

import java.util.List;

/**
 * @类描述：DAO接口
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public interface IDepartmentPlanBeanDao extends IGenericDao<DepartmentPlanBean, Long> {
    //在此添加新的DAO方法
    /**
     * 查询指定id内的部门计划信息
     *
     * @param id
     * @return
     */
    List<DepartmentPlanBean> findById(List<Long> id);
}
