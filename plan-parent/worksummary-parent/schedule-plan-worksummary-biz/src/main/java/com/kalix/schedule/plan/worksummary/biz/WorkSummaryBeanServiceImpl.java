package com.kalix.schedule.plan.worksummary.biz;

import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.schedule.plan.worksummary.api.biz.IWorkSummaryBeanService;
import com.kalix.schedule.plan.worksummary.api.dao.IWorkSummaryBeanDao;
import com.kalix.schedule.plan.worksummary.entities.WorkSummaryBean;

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
}
