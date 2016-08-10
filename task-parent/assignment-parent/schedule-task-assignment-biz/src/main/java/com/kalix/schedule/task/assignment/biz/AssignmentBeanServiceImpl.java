package com.kalix.schedule.task.assignment.biz;

import com.kalix.admin.core.api.biz.IUserBeanService;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.BeanUtil;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentBeanService;
import com.kalix.schedule.task.assignment.api.dao.IAssignmentBeanDao;
import com.kalix.schedule.task.assignment.entities.AssignmentBean;

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
public class AssignmentBeanServiceImpl extends ShiroGenericBizServiceImpl<IAssignmentBeanDao, AssignmentBean> implements IAssignmentBeanService {
    private JsonStatus jsonStatus = new JsonStatus();
    private IUserBeanService userBeanService;
    public AssignmentBeanServiceImpl() {
        super.init(AssignmentBean.class.getName());
    }

    @Override
    public JsonData getAllEntityByQuery(Integer page, Integer limit, String jsonStr){
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        Long userId = this.getShiroService().getCurrentUserId();
        String userName = this.getShiroService().getCurrentUserRealName();
        jsonMap.put("userId",String.valueOf(userId));
        jsonMap.put("userName",userName);

        String newJsonStr = SerializeUtil.serializeJson(jsonMap);
        JsonData jsonData = super.getAllEntityByQuery(page,limit,newJsonStr);
        //翻译负责人
        List beans = jsonData.getData();
        List ids= BeanUtil.getBeanFieldValueList(beans,"head");
        List values=this.userBeanService.getFieldValuesByIds(ids.toArray(),"name");
        BeanUtil.setBeanListFieldValues(beans,"header",values);

        jsonData.setTotalCount((long)beans.size());
        jsonData.setData(beans);
        return jsonData;
    }

    @Override
    public JsonStatus saveEntity(AssignmentBean entity) {
        Long userId = this.getShiroService().getCurrentUserId();
        String userName = this.getShiroService().getCurrentUserRealName();

        entity.setUserId(userId);
        entity.setUserName(userName);

        return super.saveEntity(entity);
    }

    public IUserBeanService getUserBeanService() {
        return userBeanService;
    }

    public void setUserBeanService(IUserBeanService userBeanService) {
        this.userBeanService = userBeanService;
    }
}
