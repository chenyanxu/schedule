package com.kalix.schedule.plan.worksummary.entities.internal;

import com.kalix.framework.core.api.osgi.CascadeBundleActivator;
import com.kalix.schedule.plan.worksummary.entities.WorkSummaryBean;
import org.osgi.framework.BundleContext;


public class InitActivator extends CascadeBundleActivator {
    @Override
    public void start(BundleContext bundleContext) throws Exception {
        super.start(bundleContext);
        registerCascade(WorkSummaryBean.class);
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        unRegisterCascade(WorkSummaryBean.class);
        super.stop(bundleContext);
    }
}
