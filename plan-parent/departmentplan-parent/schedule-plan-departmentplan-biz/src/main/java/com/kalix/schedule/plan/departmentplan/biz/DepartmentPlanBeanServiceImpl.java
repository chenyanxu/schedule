package com.kalix.schedule.plan.departmentplan.biz;

import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.plan.departmentplan.api.biz.IDepartmentPlanBeanService;
import com.kalix.schedule.plan.departmentplan.api.dao.IDepartmentPlanBeanDao;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;

import java.util.Map;

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

    @Override
    public JsonData getAllEntityByQuery(Integer page, Integer limit, String jsonStr){
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        //jsonMap.put("userId","1");
        //jsonMap.put("userName","");
        //jsonMap.put("departmentId","");
        //jsonMap.put("departmentName","");
        String newJsonStr = SerializeUtil.serializeJson(jsonMap);
        return super.getAllEntityByQuery(page,limit,newJsonStr);
    }

    @Override
    public JsonStatus saveEntity(DepartmentPlanBean entity) {

        entity.setUserId(0);
        entity.setUserName("");
        entity.setDepartmentId(0);
        entity.setDepartmentName("");

        return super.saveEntity(entity);
    }
}
