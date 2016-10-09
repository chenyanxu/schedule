package com.kalix.schedule.plan.workreport.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kalix.framework.core.api.persistence.PersistentEntity;
import org.dozer.DozerBeanMapper;

import javax.persistence.Column;
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
@Table(name = "schedule_workreport")
public class WorkReportBean extends PersistentEntity {

    public WorkReportBean(WorkReportBean workReportBean, String userName, String orgName) {
        new DozerBeanMapper().map(workReportBean, this);
        this.userName = userName;
        this.orgName = orgName;

    }
    /**
     * @describe 用户id
     */
    private long userId;
    /**
     * @describe 用户名
     */
    @Transient
    private String userName;
    /**
     * @describe 部门id
     */
    private long orgId;
    /**
     * @describe 部门code
     */
    private String orgCode;
    /**
     * @describe 部门名
     */
    @Transient
    private String orgName;
    /**
     * @describe 标题
     */
    private String title;
    /**
     * @describe 内容
     */
    @Column(columnDefinition = "TEXT")
    private String content;
    /**
     * @describe 汇报类型
     */
    private Integer workType;

    /**
     * @describe 计划类型
     */
    private Integer planType;

    /**
     * @describe 计划id
     */
    private long planId;
    /**
     * @describe 开始日期
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date beginDate;
    /**
     * @describe 结束日期
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date endDate;

    public long getUserId() {
        return this.userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
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

    public Integer getWorkType() {
        return this.workType;
    }

    public void setWorkType(Integer workType) {
        this.workType = workType;
    }

    public Integer getPlanType() {
        return planType;
    }

    public void setPlanType(Integer planType) {
        this.planType = planType;
    }

    public long getPlanId() {
        return planId;
    }

    public void setPlanId(long planId) {
        this.planId = planId;
    }

    public Date getBeginDate() {
        return this.beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }


}
