package com.kalix.schedule.plan.personalplan.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kalix.framework.core.api.persistence.BusinessEntity;
import com.kalix.framework.core.api.persistence.Relation;
import com.kalix.framework.core.api.persistence.TableRelation;

import javax.persistence.*;
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
@Table(name = "schedule_personalplan")
@TableRelation(relations = {
        @Relation(BeanName = "UserBean", PK = "id", PFields ={"name","icon"}, FK = "userId", FFields = {"userName","userIcon"}),
        @Relation(BeanName = "OrganizationBean", PK = "id", PFields = {"name"}, FK = "orgId", FFields = {"orgName"})
})
public class PersonalPlanBean extends BusinessEntity {
    public PersonalPlanBean() {}

    public PersonalPlanBean(PersonalPlanBean personalPlanBean, String userName,String userIcon, String orgName) {
        super(personalPlanBean,userName,userIcon);

        this.orgName = orgName;
    }

    /**
     * @describe 组织机构id
     */
    private long orgId;
    @Transient
    private String orgName;
    /**
     * @describe 标题
     */
    private String title;
    /**
     * @describe 内容
     */
    @Lob
    private String content;
    /**
     * @describe 计划类型
     */
    private Integer planType;
    /**
     * @describe 计划状态
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

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
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
}
