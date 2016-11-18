package com.kalix.schedule.task.assignment.biz;

import com.kalix.admin.core.api.biz.IUserBeanService;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;

import com.kalix.framework.core.util.BeanUtil;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentTemplateBeanService;
import com.kalix.schedule.task.assignment.api.dao.IAssignmentTemplateBeanDao;
import com.kalix.schedule.task.assignment.entities.AssignmentBean;
import com.kalix.schedule.task.assignment.entities.AssignmentTemplateBean;
import com.kalix.schedule.task.assignment.entities.TemplateBean;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @类描述： 
 * @创建人：  
 * @创建时间： 
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class AssignmentTemplateBeanServiceImpl extends ShiroGenericBizServiceImpl<IAssignmentTemplateBeanDao, AssignmentTemplateBean> implements IAssignmentTemplateBeanService {
    private JsonStatus jsonStatus = new JsonStatus();
    public AssignmentTemplateBeanServiceImpl() {
        super.init(AssignmentTemplateBean.class.getName());
    }

    private IUserBeanService userBeanService;

    public void setUserBeanService(IUserBeanService userBeanService) {
        this.userBeanService = userBeanService;
    }

    @Override
    @Transactional
    public JsonStatus saveEntity(AssignmentTemplateBean entity) {
        int hours = (int)(entity.getWorkHours()).floatValue();
        entity.setTaskDate((hours+7)/8);
        return super.saveEntity(entity);
    }

    @Override
    public JsonData getAllEntityByQuery(Integer page, Integer limit, String jsonStr) {
        JsonData jsonData = new JsonData();
        jsonData = super.getAllEntityByQuery(page,limit,jsonStr);
        List<AssignmentTemplateBean> beanList = jsonData.getData();

        List ids = BeanUtil.getBeanFieldValueList(beanList, "head");
        List values = this.userBeanService.getFieldValuesByIds(ids.toArray(), "name");
        BeanUtil.setBeanListFieldValues(beanList, "header", values);

        jsonData.setTotalCount(jsonData.getTotalCount());
        jsonData.setData(beanList);
        return jsonData;
    }
}
