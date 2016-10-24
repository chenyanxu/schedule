package com.kalix.schedule.plan.worksummary.biz;

import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.plan.worksummary.api.biz.IWorkSummaryBeanService;
import com.kalix.schedule.plan.worksummary.api.dao.IWorkSummaryBeanDao;
import com.kalix.schedule.plan.worksummary.entities.WorkSummaryBean;

import java.util.Map;

/**
 * @类描述： 
 * @创建人：  
 * @创建时间： 
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class WorkSummaryBeanServiceImpl extends ShiroGenericBizServiceImpl<IWorkSummaryBeanDao, WorkSummaryBean> implements IWorkSummaryBeanService {
    private JsonStatus jsonStatus = new JsonStatus();

    public WorkSummaryBeanServiceImpl() {
        super.init(WorkSummaryBean.class.getName());
    }

    /**
     * 查询个人工作总结
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    @Override
    public JsonData getSelfEntityByQuery(Integer page, Integer limit, String jsonStr, String sort) {
        // 查询json串中添加，当前操作人员id
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        jsonMap.put("userId", String.valueOf(this.getShiroService().getCurrentUserId()));

        return super.getAllEntityByQuery(page, limit, SerializeUtil.serializeJson(jsonMap), sort);
    }

    /**
     * 查询全部工作总结
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    @Override
    public JsonData getAllEntityByQuery(Integer page, Integer limit, String jsonStr, String sort) {
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        // 不允许查询全部计划，所以在没有code情况下，添加一个不可能存在的code，保证查询不出数据
        if (jsonMap.get("code%:relation:OrganizationBean") == null || jsonMap.get("code%:relation:OrganizationBean").isEmpty())  {
            jsonMap.put("code:relation:OrganizationBean", "-1");
        }
        return super.getAllEntityByQuery(page, limit, SerializeUtil.serializeJson(jsonMap), sort);
    }

    @Override
    public void beforeSaveEntity(WorkSummaryBean entity, JsonStatus status) {
        entity.setUserId(this.getShiroService().getCurrentUserId());
        super.beforeSaveEntity(entity,status);
    }
}
