package com.kalix.schedule.plan.workreport.biz;

import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.schedule.plan.departmentplan.api.dao.IDepartmentPlanBeanDao;
import com.kalix.schedule.plan.personalplan.api.dao.IPersonalPlanBeanDao;
import com.kalix.schedule.plan.workreport.api.biz.IWorkReportBeanService;
import com.kalix.schedule.plan.workreport.api.dao.IWorkReportBeanDao;
import com.kalix.schedule.plan.workreport.api.dao.IWorkReportPlanBeanDao;
import com.kalix.schedule.plan.workreport.entities.WorkReportBean;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @类描述： 
 * @创建人：  
 * @创建时间： 
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class WorkReportBeanServiceImpl extends ShiroGenericBizServiceImpl<IWorkReportBeanDao, WorkReportBean> implements IWorkReportBeanService {
    private JsonStatus jsonStatus = new JsonStatus();
    private IWorkReportPlanBeanDao workreportplanBeanDao;
    private IPersonalPlanBeanDao personalplanBeanDao;
    private IDepartmentPlanBeanDao departmentplanBeanDao;
    public WorkReportBeanServiceImpl() {
        super.init(WorkReportBean.class.getName());
    }

    public void setWorkreportplanBeanDao(IWorkReportPlanBeanDao workreportplanBeanDao) {
        this.workreportplanBeanDao = workreportplanBeanDao;
    }

    public void setPersonalplanBeanDao(IPersonalPlanBeanDao personalplanBeanDao) {
        this.personalplanBeanDao = personalplanBeanDao;
    }

    public void setDepartmentplanBeanDao(IDepartmentPlanBeanDao departmentplanBeanDao) {
        this.departmentplanBeanDao = departmentplanBeanDao;
    }

    /**
     * 查找工作汇报关联的个人计划
     *
     * @param id
     * @return
     */
    @Deprecated
    @Override
    public JsonData getPersonalPlanByWorkReportId(long id) {
        List<Long> list = workreportplanBeanDao.findPlanByWorkReportId(id).stream()
                .filter(n -> n.getPersonalplanId() != 0)
                .map(n -> n.getPersonalplanId()).collect(Collectors.toList());

        return JsonData.jsonData(personalplanBeanDao.findById(list));
    }

    /**
     * 查找工作汇报关联的部门计划
     *
     * @param id
     * @return
     */
    @Deprecated
    @Override
    public JsonData getDepartmentPlanByWorkReportId(long id) {
        List<Long> list = workreportplanBeanDao.findPlanByWorkReportId(id).stream()
                .filter(n -> n.getDepartmentplanId() != 0)
                .map(n -> n.getDepartmentplanId()).collect(Collectors.toList());

        return JsonData.jsonData(departmentplanBeanDao.findById(list));
    }
}
