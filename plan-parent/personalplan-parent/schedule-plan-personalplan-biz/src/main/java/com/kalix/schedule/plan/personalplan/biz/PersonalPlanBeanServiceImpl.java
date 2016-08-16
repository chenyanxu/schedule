package com.kalix.schedule.plan.personalplan.biz;

import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.schedule.plan.personalplan.api.biz.IPersonalPlanBeanService;
import com.kalix.schedule.plan.personalplan.api.dao.IPersonalPlanBeanDao;
import com.kalix.schedule.plan.personalplan.entities.PersonalPlanBean;

/**
 * @类描述： 
 * @创建人：  
 * @创建时间： 
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class PersonalPlanBeanServiceImpl extends ShiroGenericBizServiceImpl<IPersonalPlanBeanDao, PersonalPlanBean> implements IPersonalPlanBeanService {
    private JsonStatus jsonStatus = new JsonStatus();

    public PersonalPlanBeanServiceImpl() {
        super.init(PersonalPlanBean.class.getName());
    }

    @Override
    public void beforeSaveEntity(PersonalPlanBean entity, JsonStatus status) {
        entity.setUserId(this.getShiroService().getCurrentUserId());
        entity.setUserName(this.getShiroService().getCurrentUserRealName());
        super.beforeSaveEntity(entity,status);
    }
}
