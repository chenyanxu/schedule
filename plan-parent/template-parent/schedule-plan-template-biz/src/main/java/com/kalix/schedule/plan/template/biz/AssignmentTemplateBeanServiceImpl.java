package com.kalix.schedule.plan.template.biz;

import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentTemplateBeanService;
import com.kalix.schedule.plan.template.api.dao.IAssignmentTemplateBeanDao;
import com.kalix.schedule.plan.template.entities.AssignmentTemplateBean;
import com.kalix.schedule.plan.template.entities.TemplateBean;

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
        super.init(TemplateBean.class.getName());
    }
}
