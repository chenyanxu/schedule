package com.kalix.schedule.plan.departmentplan.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kalix.framework.core.api.annotation.KalixCascade;
import com.kalix.framework.core.api.annotation.Relation;
import com.kalix.framework.core.api.annotation.TableCascade;
import com.kalix.framework.core.api.annotation.TableRelation;
import com.kalix.framework.core.api.persistence.BusinessEntity;

import javax.persistence.Entity;
import javax.persistence.Lob;
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
@Table(name = "schedule_departmentplan")
@TableRelation(relations = {
        @Relation(BeanName = "UserBean", PK = "id", PFields = {"name", "icon"}, FK = "userId", FFields = {"userName", "userIcon"}),
        @Relation(BeanName = "OrganizationBean", PK = "id", PFields = {"name"}, FK = "orgId", FFields = {"orgName"})
})
@TableCascade(kalixCascades = {
        @KalixCascade(beans = "com.kalix.admin.core.entities.UserBean", deletable = true, foreignKey = "userId"),
        @KalixCascade(beans = "com.kalix.admin.core.entities.OrganizationBean", deletable = true, foreignKey = "orgid")
})
public class DepartmentPlanBean extends BusinessEntity {
    public DepartmentPlanBean() {
    }

    public DepartmentPlanBean(DepartmentPlanBean departmentPlanBean, String userName, String userIcon, String orgName) {
        super(departmentPlanBean, userName, userIcon);

        this.orgName = orgName;
    }

    /**
     * @describe 组织机构ID
     */
    private long orgId;
    /**
     * @describe 组织机构名称
     */
    @Transient
    private String orgName;
    /**
     * @describe 计划标题
     */
    private String title;
    /**
     * @describe 计划内容
     */
    @Lob
    private String content;
    /**
     * @describe 计划类型
     */
    private Integer planType;
    /**
     * @describe 计划开始时间
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date beginDate;
    /**
     * @describe 计划结束时间
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date endDate;
    /**
     * @describe 计划状态
     */
    private Integer state;

    @Transient
    private long templateId;

    public long getOrgId() {
        return orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getPlanType() {
        return planType;
    }

    public void setPlanType(Integer planType) {
        this.planType = planType;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public long getTemplateId() {
        return templateId;
    }

    public void setTemplateId(long templateId) {
        this.templateId = templateId;
    }
}
