package com.kalix.schedule.plan.personalplan.biz;

import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.plan.personalplan.api.biz.IPersonalPlanBeanService;
import com.kalix.schedule.plan.personalplan.api.dao.IPersonalPlanBeanDao;
import com.kalix.schedule.plan.personalplan.entities.PersonalPlanBean;

import java.util.Map;

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

    /**
     * 查询个人的个人计划
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
     * 根据条件查询个人计划
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
        if (jsonMap.get("code%:relation:OrganizationBean") == null || jsonMap.get("code%:relation:OrganizationBean").isEmpty())  {
            jsonMap.put("code:relation:OrganizationBean", "-1");
        }
        return super.getAllEntityByQuery(page, limit, SerializeUtil.serializeJson(jsonMap));
    }

    @Override
    public void beforeSaveEntity(PersonalPlanBean entity, JsonStatus status) {
        entity.setUserId(this.getShiroService().getCurrentUserId());
        super.beforeSaveEntity(entity,status);
    }
}
