package com.kalix.schedule.plan.template.biz;

import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.schedule.plan.template.api.biz.ITemplateBeanService;
import com.kalix.schedule.plan.template.api.dao.ITemplateBeanDao;
import com.kalix.schedule.plan.template.entities.TemplateBean;

/**
 * @类描述： 
 * @创建人：  
 * @创建时间： 
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class TemplateBeanServiceImpl extends ShiroGenericBizServiceImpl<ITemplateBeanDao, TemplateBean> implements ITemplateBeanService {
    private JsonStatus jsonStatus = new JsonStatus();

    public TemplateBeanServiceImpl() {
        super.init(TemplateBean.class.getName());
    }
}
