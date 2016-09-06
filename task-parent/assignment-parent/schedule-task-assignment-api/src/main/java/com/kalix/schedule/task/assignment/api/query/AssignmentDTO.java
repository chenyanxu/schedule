package com.kalix.schedule.task.assignment.api.query;


import com.kalix.framework.core.api.web.model.BaseDTO;

/**
 * Created by sunlf on 2015/11/5.
 */
public class AssignmentDTO extends BaseDTO {
    private String orgName;
    private Integer total;
    private Integer waiting;
    private Integer reject;
    private Integer process;
    private Integer processDelay;
    private Integer complete;

    private Integer finishDelay;
    private Integer finish;
    private Integer failure;
    private Integer cancel;

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getWaiting() {
        return waiting;
    }

    public void setWaiting(Integer waiting) {
        this.waiting = waiting;
    }

    public Integer getReject() {
        return reject;
    }

    public void setReject(Integer reject) {
        this.reject = reject;
    }

    public Integer getProcess() {
        return process;
    }

    public void setProcess(Integer process) {
        this.process = process;
    }

    public Integer getProcessDelay() {
        return processDelay;
    }

    public void setProcessDelay(Integer processDelay) {
        this.processDelay = processDelay;
    }

    public Integer getComplete() {
        return complete;
    }

    public void setComplete(Integer complete) {
        this.complete = complete;
    }

    public Integer getFinish() {
        return finish;
    }

    public void setFinish(Integer finish) {
        this.finish = finish;
    }

    public Integer getFinishDelay() {
        return finishDelay;
    }

    public void setFinishDelay(Integer finishDelay) {
        this.finishDelay = finishDelay;
    }

    public Integer getFailure() {
        return failure;
    }

    public void setFailure(Integer failure) {
        this.failure = failure;
    }

    public Integer getCancel() {
        return cancel;
    }

    public void setCancel(Integer cancel) {
        this.cancel = cancel;
    }
}