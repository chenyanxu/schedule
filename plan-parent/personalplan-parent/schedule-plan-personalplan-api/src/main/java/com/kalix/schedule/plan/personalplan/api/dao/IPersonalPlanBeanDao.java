package com.kalix.schedule.plan.personalplan.api.dao;

import com.kalix.framework.core.api.dao.IGenericDao;
import com.kalix.schedule.plan.personalplan.entities.PersonalPlanBean;

import java.util.List;

/**
 * @类描述：DAO接口
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public interface IPersonalPlanBeanDao extends IGenericDao<PersonalPlanBean, Long> {
    //在此添加新的DAO方法

    /**
     * 查询指定id内的个人计划信息
     * 
     * @param id
     * @return
     */
    List<PersonalPlanBean> findById(List<Long> id);
}
