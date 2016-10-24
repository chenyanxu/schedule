package com.kalix.schedule.plan.departmentplan.entities.internal;

import com.kalix.framework.core.api.osgi.CascadeBundleActivator;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;
import org.osgi.framework.BundleContext;


public class InitActivator extends CascadeBundleActivator {
    @Override
    public void start(BundleContext bundleContext) throws Exception {
        super.start(bundleContext);
        registerCascade(DepartmentPlanBean.class);
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        unRegisterCascade(DepartmentPlanBean.class);
        super.stop(bundleContext);
    }
}
