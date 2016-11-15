package com.kalix.schedule.plan.template.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kalix.framework.core.api.persistence.PersistentEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import java.util.Date;

/**
 * @类描述：
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
//todo 修改模型定义
@Entity
@Table(name = "schedule_template")
public class TemplateBean extends PersistentEntity {
    /**
     * @describe 模板名称
     */
    private String templateName;
    /**
     * @describe 用户ID
     */
    private Long userId;
    /**
     * @describe 用户姓名
     */
    private String userName;
    /**
     * @describe 组织机构ID
     */
    private Long orgId;
    /**
     * @describe 组织机构编码
     */
    private String orgCode;
    /**
     * @describe 组织机构名称
     */
    private String orgName;
    /**
     * @describe 部门计划ID，不需要存到数据库
     */
    @Transient
    private Long departmentplanId;
    /**
     * @describe 计划标题
     */
    private String title;
    /**
     * @describe 计划内容
     */
    private String content;
    /**
     * @describe 计划类型
     */
    private Integer planType;
    /**
     * @describe 计划天数
     */
    private Integer planDate;
    /**
     * @describe 计划状态
     */
    private Integer state;
    /**
     * @describe 模板管理的任务模板ID
     */
    private String taskIds;

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public String getOrgCode() {
        return this.orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getOrgName() {
        return this.orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public Long getDepartmentplanId() {
        return departmentplanId;
    }

    public void setDepartmentplanId(Long departmentplanId) {
        this.departmentplanId = departmentplanId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getPlanType() {
        return this.planType;
    }

    public void setPlanType(Integer planType) {
        this.planType = planType;
    }

    public Integer getPlanDate() {
        return planDate;
    }

    public void setPlanDate(Integer planDate) {
        this.planDate = planDate;
    }

    public Integer getState() {
        return this.state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getTaskIds() {
        return this.taskIds;
    }

    public void setTaskIds(String taskIds) {
        this.taskIds = taskIds;
    }


}
