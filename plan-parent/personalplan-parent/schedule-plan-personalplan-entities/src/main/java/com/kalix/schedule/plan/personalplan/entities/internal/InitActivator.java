package com.kalix.schedule.plan.personalplan.entities.internal;

import com.kalix.framework.core.impl.system.BundleActivatorImpl;
import com.kalix.schedule.plan.personalplan.entities.PersonalPlanBean;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

/**
 * Created by sunlf on 14-3-23.
 */
public class InitActivator extends BundleActivatorImpl implements BundleActivator {
    @Override
    public void start(BundleContext bundleContext) throws Exception {
        super.start(bundleContext);
        registerCascade(PersonalPlanBean.class);
    }
}
