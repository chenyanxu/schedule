package com.kalix.schedule.task.assignment.entities;

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
@Table(name = "schedule_assignment")
public class AssignmentBean extends PersistentEntity {
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
     * @describe 开始日期
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date beginDate;
    /**
     * @describe 结束日期
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date endDate;
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
    /**
     * @describe 任务进度
     */
    @Transient
    private Integer percentNumber;
    /**
     * @describe 任务进度
     */
    private float percent;
    /**
     * @describe 进度说明
     */
    private String comment;
    /**
     * @describe 完成任务打分
     */
    private Integer score;
    /**
     * @describe 完成任务意见
     */
    private String advice;

    /*子任务数*/
    @Transient
    private Integer subTaskCount;
    /*
    任务事件类型
     */
    @Transient
    private Integer eventType;

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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public Integer getPercentNumber() {
        return percentNumber;
    }

    public void setPercentNumber(Integer percentNumber) {
        this.percentNumber = percentNumber;
    }

    public float getPercent() {
        return percent;
    }

    public void setPercent(float percent) {
        this.percent = percent;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getSubTaskCount() {
        return subTaskCount;
    }

    public void setSubTaskCount(Integer subTaskCount) {
        this.subTaskCount = subTaskCount;
    }

    public Integer getEventType() {
        return eventType;
    }

    public void setEventType(Integer eventType) {
        this.eventType = eventType;
    }
}
