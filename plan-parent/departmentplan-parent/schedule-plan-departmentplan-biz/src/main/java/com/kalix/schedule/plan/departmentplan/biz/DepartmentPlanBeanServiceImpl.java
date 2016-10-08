package com.kalix.schedule.plan.departmentplan.biz;

import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.plan.departmentplan.api.biz.IDepartmentPlanBeanService;
import com.kalix.schedule.plan.departmentplan.api.dao.IDepartmentPlanBeanDao;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;

import javax.transaction.Transactional;
import java.util.List;
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
     * 查询个人的部门计划,提供给combobox使用,已经完成的部门计划不出现在combobox中
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    @Override
    public JsonData getDepPlanCombox(Integer page, Integer limit, String jsonStr) {
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        String condition=" where 1=1 ";
        for (Map.Entry<String, String> entry : jsonMap.entrySet()) {
            if (entry.getValue() != null && !entry.getValue().equals("")) {
                condition = condition + " and " + entry.getKey() + " = " + entry.getValue();
            }
        }
        String userId = String.valueOf(this.getShiroService().getCurrentUserId());
        condition += " and userId="+userId;
        // 已完成的部门计划在新建任务时不显示
        condition += " and state <> 2";

        List comboList = dao.findByNativeSql("select * from " + dao.getTableName() + condition,DepartmentPlanBean.class,null);

        JsonData jsonData = new JsonData();
        jsonData.setData(comboList);
        jsonData.setTotalCount((long)comboList.size());

        return jsonData;
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
        if (jsonMap.get("orgCode%") == null || "".equals(jsonMap.get("orgCode%")))  {
            jsonMap.put("orgCode", "-1");
        }
        return super.getAllEntityByQuery(page, limit, SerializeUtil.serializeJson(jsonMap));
    }

    @Override
    @Transactional
    public JsonStatus saveEntity(DepartmentPlanBean entity) {
        entity.setUserId(this.getShiroService().getCurrentUserId());
        entity.setUserName(this.getShiroService().getCurrentUserRealName());
        return super.saveEntity(entity);
    }
}
