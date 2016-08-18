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

    /**
     * 查询个人的部门计划
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    @Override
    public JsonData getSelfEntityByQuery(Integer page, Integer limit, String jsonStr) {
        // 查询json串中添加，当前操作人员id
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        jsonMap.put("userId", String.valueOf(this.getShiroService().getCurrentUserId()));

        return super.getAllEntityByQuery(page, limit, SerializeUtil.serializeJson(jsonMap));
    }

    /**
     * 根据条件查询部门计划
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    @Override
    public JsonData getAllEntityByQuery(Integer page, Integer limit, String jsonStr) {
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        // 不允许查询全部计划，所以在没有code情况下，添加一个不可能存在的code，保证查询不出数据
        if (jsonMap.get("orgCode") == null || "".equals(jsonMap.get("orgCode")))  {
            jsonMap.put("orgCode", "-1");
        }
        return super.getAllEntityByQuery(page, limit, SerializeUtil.serializeJson(jsonMap));
    }

    @Override
    public JsonStatus saveEntity(DepartmentPlanBean entity) {
        entity.setUserId(this.getShiroService().getCurrentUserId());
        entity.setUserName(this.getShiroService().getCurrentUserRealName());
        return super.saveEntity(entity);
    }
}
