package com.kalix.schedule.plan.workreport.entities.internal;

import com.kalix.framework.core.api.osgi.CascadeBundleActivator;
import com.kalix.schedule.plan.workreport.entities.WorkReportBean;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

/**
 * Created by sunlf on 14-3-23.
 */
public class InitActivator extends CascadeBundleActivator implements BundleActivator {
    @Override
    public void start(BundleContext bundleContext) throws Exception {
        super.start(bundleContext);
        registerCascade(WorkReportBean.class);
    }
}
