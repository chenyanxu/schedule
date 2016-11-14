package com.kalix.schedule.plan.workreport.entities;

import com.kalix.framework.core.api.persistence.PersistentEntity;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

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
@Table(name = "schedule_workreport_plan")
@Inheritance(strategy = InheritanceType.JOINED)
public class WorkReportPlanBean extends PersistentEntity {
    /**
     * @describe 工作汇报id
     */
    private Long workreportId;
    /**
     * @describe 个人计划id
     */
    private Long personalplanId;

    /**
     * @describe 部门计划id
     */
    private Long departmentplanId;

    public Long getWorkreportId() {
        return workreportId;
    }

    public void setWorkreportId(Long workreportId) {
        this.workreportId = workreportId;
    }

    public Long getPersonalplanId() {
        return personalplanId;
    }

    public void setPersonalplanId(Long personalplanId) {
        this.personalplanId = personalplanId;
    }

    public Long getDepartmentplanId() {
        return departmentplanId;
    }

    public void setDepartmentplanId(Long departmentplanId) {
        this.departmentplanId = departmentplanId;
    }
}
