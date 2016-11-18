package com.kalix.schedule.task.assignment.biz;

import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.schedule.plan.departmentplan.api.biz.IDepartmentPlanBeanService;
import com.kalix.schedule.plan.departmentplan.api.dao.IDepartmentPlanBeanDao;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;

import com.kalix.schedule.task.assignment.api.biz.IAssignmentBeanService;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentTemplateBeanService;
import com.kalix.schedule.task.assignment.api.biz.ITemplateBeanService;
import com.kalix.schedule.task.assignment.api.dao.ITemplateBeanDao;
import com.kalix.schedule.task.assignment.entities.AssignmentBean;
import com.kalix.schedule.task.assignment.entities.AssignmentTemplateBean;
import com.kalix.schedule.task.assignment.entities.TemplateBean;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;

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
public class TemplateBeanServiceImpl extends ShiroGenericBizServiceImpl<ITemplateBeanDao, TemplateBean> implements ITemplateBeanService {
    private JsonStatus jsonStatus = new JsonStatus();
    //private IDepartmentPlanBeanService departmentplanBeanService;
    private IDepartmentPlanBeanDao departmentPlanBeanDao;
    private IAssignmentBeanService assignmentBeanService;
    private IAssignmentTemplateBeanService assignmentTemplateBeanService;
    public TemplateBeanServiceImpl() {
        super.init(TemplateBean.class.getName());
    }


    @Override
    @Transactional
    public JsonStatus saveEntity(TemplateBean entity) {
        entity.setUserId(this.getShiroService().getCurrentUserId());

        return super.saveEntity(entity);
    }

    public void setDepartmentPlanBeanDao(IDepartmentPlanBeanDao departmentPlanBeanDao) {
        this.departmentPlanBeanDao = departmentPlanBeanDao;
    }

    public void setAssignmentBeanService(IAssignmentBeanService assignmentBeanService) {
        this.assignmentBeanService = assignmentBeanService;
    }

    public void setAssignmentTemplateBeanService(IAssignmentTemplateBeanService assignmentTemplateBeanService) {
        this.assignmentTemplateBeanService = assignmentTemplateBeanService;
    }

    @Override
    @Transactional
    public JsonStatus saveTemplateEntity(TemplateBean entity) {
        //根据部门计划id查找计划
        List<DepartmentPlanBean> list = departmentPlanBeanDao.findByNativeSql("select * from schedule_departmentplan where id =" + entity.getDepartmentplanId(),DepartmentPlanBean.class,null);
        //DepartmentPlanBean departmentPlanBean = departmentplanBeanService.getEntity(entity.getDepartmentplanId());
        DepartmentPlanBean departmentPlanBean = list.get(0);
        //根据部门计划id查找该计划下的任务
        JsonData jsonData = assignmentBeanService.getAllTaskEntityByDepartmentPlanId(1, 20, entity.getDepartmentplanId());
        List<AssignmentBean> assignmentList = jsonData.getData();
        String taskIds = "";
        for(int i = 0; i < assignmentList.size(); i++){
            Mapper mapper = new DozerBeanMapper();

            taskIds += assignmentList.get(i).getId() + ",";
            AssignmentTemplateBean assignmentTemplateBean = mapper.map(assignmentList.get(i),AssignmentTemplateBean.class);

            assignmentTemplateBean.setId(0L);
            Long intervalMilli = assignmentList.get(i).getEndDate().getTime() - assignmentList.get(i).getBeginDate().getTime();
            assignmentTemplateBean.setTaskDate((int) (intervalMilli / (24 * 60 * 60 * 1000)));

            //保存部门计划下的任务信息
            assignmentTemplateBeanService.saveEntity(assignmentTemplateBean);
        }

        if(taskIds.length() > 0){
            taskIds = taskIds.substring(0,taskIds.length() - 1);
        }

        Mapper mapper = new DozerBeanMapper();

        TemplateBean templateBean = mapper.map(departmentPlanBean,TemplateBean.class);
        templateBean.setId(0L);
        templateBean.setTemplateName(entity.getTemplateName());
        templateBean.setDepartmentplanId(departmentPlanBean.getOrgId());

        Long intervalMilli = departmentPlanBean.getEndDate().getTime() - departmentPlanBean.getBeginDate().getTime();
        templateBean.setPlanDate((int) (intervalMilli / (24 * 60 * 60 * 1000)));

        templateBean.setTaskIds(taskIds);

        //保存部门计划模板信息
        return super.saveEntity(templateBean);
    }
}
