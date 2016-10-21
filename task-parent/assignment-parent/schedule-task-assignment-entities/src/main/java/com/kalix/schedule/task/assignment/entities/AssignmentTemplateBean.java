package com.kalix.schedule.task.assignment.entities;

import com.kalix.framework.core.api.persistence.PersistentEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

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
@Table(name = "schedule_assignment_template")
public class AssignmentTemplateBean extends PersistentEntity {
    /**
     * @describe 用户id
     */
    private long planTemplateId;
    /**
     * @describe 用户id
     */
    private long userId;
    /**
     * @describe 用户名
     */
    private String userName;
    /**
     * @describe 部门id
     */
    private long orgId;
    /**
     * @describe 部门代码
     */
    private String orgCode;
    /**
     * @describe 部门名称
     */
    private String orgName;
    /**
     * @describe 标题
     */
    private String title;
    /**
     * @describe 来源 0部门计划；1母任务；2自定义
     */
    private Integer sourceType;
    /**
     * @describe 来源 sourceType为0时，sourceId为部门计划的id，为1时为母任务的id
     */
    private Integer sourceId;
    /**
     * @describe 内容
     */
    private String content;
    /**
     * @describe 任务状态
     */
    private Integer state;
    /**
     * @describe 任务天数
     */
    private Integer taskDate;
    /**
     * @describe 评估工时
     */
    private Float workHours;
    /**
     * @describe 负责人
     */
    private long head;
    @Transient
    private String header;
    /**
     * @describe 参与人
     */
    private String participant;
    /**
     * @describe 奖罚标准
     */
    private String rewardStandard;
    /**
     * @describe 领导批示
     */
    private String instruction;

    public long getPlanTemplateId() {
        return planTemplateId;
    }

    public void setPlanTemplateId(long planTemplateId) {
        this.planTemplateId = planTemplateId;
    }

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
        return orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getOrgName() {
        return orgName;
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

    public Integer getSourceType() {
        return sourceType;
    }

    public void setSourceType(Integer sourceType) {
        this.sourceType = sourceType;
    }

    public Integer getSourceId() {
        return sourceId;
    }

    public void setSourceId(Integer sourceId) {
        this.sourceId = sourceId;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Float getWorkHours() {
        return this.workHours;
    }

    public void setWorkHours(Float workHours) {
        this.workHours = workHours;
    }

    public long getHead() {
        return head;
    }

    public void setHead(long head) {
        this.head = head;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getParticipant() {
        return this.participant;
    }

    public void setParticipant(String participant) {
        this.participant = participant;
    }

    public String getRewardStandard() {
        return this.rewardStandard;
    }

    public void setRewardStandard(String rewardStandard) {
        this.rewardStandard = rewardStandard;
    }

    public String getInstruction() {
        return this.instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public Integer getTaskDate() {
        return taskDate;
    }

    public void setTaskDate(Integer taskDate) {
        this.taskDate = taskDate;
    }
}
