package com.kalix.schedule.task.assignment.api.query;

import com.kalix.framework.core.api.web.model.BaseDTO;

/**
 * Created by sunlf on 2015/11/5.
 */
public class AssignmentPieChartDTO extends BaseDTO {
    private String orgName;
    private float percent;

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public float getPercent() {
        return percent;
    }

    public void setPercent(float percent) {
        this.percent = percent;
    }
}