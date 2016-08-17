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

//    @Override
//    public JsonData getAllEntityByQuery(Integer page, Integer limit, String jsonStr){
//        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
//        Long userId = this.getShiroService().getCurrentUserId();
//        String userName = this.getShiroService().getCurrentUserRealName();
//        jsonMap.put("userId",String.valueOf(userId));
//        jsonMap.put("userName",userName);
//
//        String newJsonStr = SerializeUtil.serializeJson(jsonMap);
//        return super.getAllEntityByQuery(page,limit,newJsonStr);
//    }

    @Override
    public JsonStatus saveEntity(DepartmentPlanBean entity) {
        Long userId = this.getShiroService().getCurrentUserId();
        String userName = this.getShiroService().getCurrentUserRealName();

        entity.setUserId(userId);
        entity.setUserName(userName);

        return super.saveEntity(entity);
    }
}
