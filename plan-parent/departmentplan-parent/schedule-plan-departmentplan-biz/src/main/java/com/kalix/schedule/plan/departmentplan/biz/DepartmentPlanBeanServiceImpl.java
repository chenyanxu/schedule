package com.kalix.schedule.plan.departmentplan.biz;

import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.plan.departmentplan.api.biz.IDepartmentPlanBeanService;
import com.kalix.schedule.plan.departmentplan.api.dao.IDepartmentPlanBeanDao;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentBeanService;
import com.kalix.schedule.task.assignment.api.biz.ITemplateBeanService;
import com.kalix.schedule.task.assignment.entities.AssignmentBean;
import com.kalix.schedule.task.assignment.entities.TemplateBean;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;

import javax.transaction.Transactional;
import java.util.Date;
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
public class DepartmentPlanBeanServiceImpl extends ShiroGenericBizServiceImpl<IDepartmentPlanBeanDao, DepartmentPlanBean> implements IDepartmentPlanBeanService {
    private JsonStatus jsonStatus = new JsonStatus();

    public DepartmentPlanBeanServiceImpl() {
        super.init(DepartmentPlanBean.class.getName());
    }
    private ITemplateBeanService templateBeanService;
    private IAssignmentBeanService assignmentBeanService;
    /**
     * 查询个人的部门计划,提供给combobox使用,已经完成的部门计划不出现在combobox中
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    @Override
    public JsonData getDepPlanCombox(Integer page, Integer limit, String jsonStr) {
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        String condition=" where 1=1 ";
        for (Map.Entry<String, String> entry : jsonMap.entrySet()) {
            if (entry.getValue() != null && !entry.getValue().equals("")) {
                condition = condition + " and " + entry.getKey() + " = " + entry.getValue();
            }
        }
        String userId = String.valueOf(this.getShiroService().getCurrentUserId());
        condition += " and userId="+userId;
        // 已完成的部门计划在新建任务时不显示
        condition += " and state <> 2";

        List comboList = dao.findByNativeSql("select * from " + dao.getTableName() + condition,DepartmentPlanBean.class,null);

        JsonData jsonData = new JsonData();
        jsonData.setData(comboList);
        jsonData.setTotalCount((long)comboList.size());

        return jsonData;
    }
    /**
     * 查询个人的部门计划
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
     * 根据条件查询部门计划
     *
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
    @Transactional
    public JsonStatus saveEntity(DepartmentPlanBean entity) {
        // 获取登录用户id及用户名
        Long userId = this.getShiroService().getCurrentUserId();
        //String userName = this.getShiroService().getCurrentUserRealName();

        // 先判断是否是从计划模板创建的任务
        if(entity.getTemplateId() != 0) {//根据模板生成部门计划，部门计划下的任务
            //先保存该计划下的任务
            AssignmentBean assignmentBean = new AssignmentBean();
            assignmentBean.setTemplateId(entity.getTemplateId());
            jsonStatus = assignmentBeanService.saveEntity(assignmentBean);
            if(!jsonStatus.getSuccess())
                return jsonStatus;

            // 查询该计划模板
            TemplateBean templateBean = templateBeanService.getEntity(entity.getTemplateId());
            Mapper mapper = new DozerBeanMapper();
            DepartmentPlanBean departmentPlanBean = mapper.map(templateBean,DepartmentPlanBean.class);
            departmentPlanBean.setId(0);
            //departmentPlanBean.setUserName(userName);
            departmentPlanBean.setUserId(userId);
            departmentPlanBean.setBeginDate(new Date());
            Date endDate = new Date();
            departmentPlanBean.setEndDate(new Date(endDate.getTime() + templateBean.getPlanDate()*24*60*60*1000));
            departmentPlanBean.setCreationDate(new Date());
            departmentPlanBean.setUpdateDate(new Date());
            //新增部门计划
            return super.saveEntity(departmentPlanBean);
        }else {
            entity.setUserId(this.getShiroService().getCurrentUserId());
            //entity.setUserName(this.getShiroService().getCurrentUserRealName());
            return super.saveEntity(entity);
        }
    }

    public void setTemplateBeanService(ITemplateBeanService templateBeanService) {
        this.templateBeanService = templateBeanService;
    }

    public void setAssignmentBeanService(IAssignmentBeanService assignmentBeanService) {
        this.assignmentBeanService = assignmentBeanService;
    }
}
