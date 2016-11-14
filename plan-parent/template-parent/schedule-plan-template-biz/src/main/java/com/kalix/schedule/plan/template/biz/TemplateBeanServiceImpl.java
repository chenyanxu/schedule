package com.kalix.schedule.plan.template.biz;

import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.schedule.plan.departmentplan.api.biz.IDepartmentPlanBeanService;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;
import com.kalix.schedule.plan.template.api.biz.IAssignmentTemplateBeanService;
import com.kalix.schedule.plan.template.api.biz.ITemplateBeanService;
import com.kalix.schedule.plan.template.api.dao.ITemplateBeanDao;
import com.kalix.schedule.plan.template.entities.AssignmentTemplateBean;
import com.kalix.schedule.plan.template.entities.TemplateBean;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentBeanService;
import com.kalix.schedule.task.assignment.entities.AssignmentBean;

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
    private IDepartmentPlanBeanService departmentplanBeanService;
    private IAssignmentBeanService assignmentBeanService;
    private IAssignmentTemplateBeanService assignmentTemplateBeanService;
    public TemplateBeanServiceImpl() {
        super.init(TemplateBean.class.getName());
    }


    @Override
    @Transactional
    public JsonStatus saveEntity(TemplateBean entity) {
        //Long departmentplanId = entity.getDepartmentplanId();

        //DepartmentPlanBean departmentplanBean = departmentplanBeanService.getEntity(departmentplanId);
        return super.saveEntity(entity);
    }

    public void setDepartmentplanBeanService(IDepartmentPlanBeanService departmentplanBeanService) {
        this.departmentplanBeanService = departmentplanBeanService;
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
        DepartmentPlanBean departmentPlanBean = departmentplanBeanService.getEntity(entity.getDepartmentplanId());
        //根据部门计划id查找该计划下的任务
        JsonData jsonData = assignmentBeanService.getAllTaskEntityByDepartmentPlanId(1, 20, entity.getDepartmentplanId());
        List<AssignmentBean> assignmentList = jsonData.getData();
        String taskIds = "";
        for(int i = 0; i < assignmentList.size(); i++){
            taskIds += assignmentList.get(i).getId() + ",";
            AssignmentTemplateBean assignmentTemplateBean = new AssignmentTemplateBean();
            assignmentTemplateBean.setId(0);
            assignmentTemplateBean.setUserId(assignmentList.get(i).getUserId());
            assignmentTemplateBean.setUserName(assignmentList.get(i).getUserName());
            assignmentTemplateBean.setOrgId(assignmentList.get(i).getOrgId());
            assignmentTemplateBean.setOrgCode(assignmentList.get(i).getOrgCode());
            assignmentTemplateBean.setOrgName(assignmentList.get(i).getOrgName());
            assignmentTemplateBean.setTitle(assignmentList.get(i).getTitle());
            assignmentTemplateBean.setSourceType(assignmentList.get(i).getSourceType());
            assignmentTemplateBean.setSourceId(assignmentList.get(i).getSourceId());
            assignmentTemplateBean.setContent(assignmentList.get(i).getContent());
            assignmentTemplateBean.setState(assignmentList.get(i).getState());
            Long intervalMilli = assignmentList.get(i).getEndDate().getTime() - assignmentList.get(i).getBeginDate().getTime();
            assignmentTemplateBean.setTaskDate((int) (intervalMilli / (24 * 60 * 60 * 1000)));
            assignmentTemplateBean.setWorkHours(assignmentList.get(i).getWorkHours());
            assignmentTemplateBean.setHead(assignmentList.get(i).getHead());
            assignmentTemplateBean.setHeader(assignmentList.get(i).getHeader());
            assignmentTemplateBean.setParticipant(assignmentList.get(i).getParticipant());
            assignmentTemplateBean.setRewardStandard(assignmentList.get(i).getRewardStandard());
            assignmentTemplateBean.setInstruction(assignmentList.get(i).getInstruction());

            //保存部门计划下的任务信息
            assignmentTemplateBeanService.saveEntity(assignmentTemplateBean);
        }

        if(taskIds.length() > 0){
            taskIds = taskIds.substring(0,taskIds.length() - 1);
        }

        TemplateBean templateBean = new TemplateBean();
        templateBean.setId(0);
        templateBean.setTemplateName(entity.getTemplateName());
        templateBean.setUserId(departmentPlanBean.getUserId());
        templateBean.setUserName(departmentPlanBean.getUserName());
        templateBean.setOrgId(departmentPlanBean.getOrgId());
        templateBean.setOrgCode(departmentPlanBean.getOrgCode());
        templateBean.setOrgName(departmentPlanBean.getOrgName());
        templateBean.setTitle(departmentPlanBean.getTitle());
        templateBean.setContent(departmentPlanBean.getContent());
        templateBean.setPlanType(departmentPlanBean.getPlanType());
        Long intervalMilli = departmentPlanBean.getEndDate().getTime() - departmentPlanBean.getBeginDate().getTime();
        templateBean.setPlanDate((int) (intervalMilli / (24 * 60 * 60 * 1000)));

        templateBean.setState(departmentPlanBean.getState());
        templateBean.setTaskIds(taskIds);

        //保存部门计划模板信息
        return super.saveEntity(templateBean);
    }
}
