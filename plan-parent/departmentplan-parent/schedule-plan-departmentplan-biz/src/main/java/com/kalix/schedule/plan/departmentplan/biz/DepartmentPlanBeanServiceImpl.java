package com.kalix.schedule.plan.departmentplan.biz;

import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.schedule.plan.departmentplan.api.biz.IDepartmentPlanBeanService;
import com.kalix.schedule.plan.departmentplan.api.dao.IDepartmentPlanBeanDao;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;

/**
 * @类描述： 
 * @创建人：  
 * @创建时间： 
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class DepartmentPlanBeanServiceImpl extends ShiroGenericBizServiceImpl<IDepartmentPlanBeanDao, DepartmentPlanBean> implements IDepartmentPlanBeanService {
    private JsonStatus jsonStatus = new JsonStatus();

    public DepartmentPlanBeanServiceImpl() {
        super.init(DepartmentPlanBean.class.getName());
    }
}
