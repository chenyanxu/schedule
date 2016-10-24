package com.kalix.schedule.plan.departmentplan.extjs.internal;

import com.kalix.framework.core.api.osgi.KalixBundleActivator;
import com.kalix.framework.core.util.SystemUtil;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;
/**
 * Created by sunlf on 14-3-23.
 */
public class InitActivator extends KalixBundleActivator {
    private ServiceReference reference;
    private HttpService httpService;

    @Override
    public void start(BundleContext bundleContext) throws Exception {
        super.start(bundleContext);

        reference = bundleContext.getServiceReference(HttpService.class.getName());
        httpService = (HttpService) bundleContext.getService(reference);

        if(deploy){
            httpService.registerResources(contextPath + "/app/plan/departmentplan", "/min/departmentplan", null);
            httpService.registerResources(contextPath + "/app/plan/departmentplansearch", "/min/departmentplansearch", null);
        }
        else{
            httpService.registerResources(contextPath + "/app/plan/departmentplan", "/departmentplan", null);
            httpService.registerResources(contextPath + "/app/plan/departmentplansearch", "/departmentplansearch", null);
        }
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        super.stop(bundleContext);

        if(httpService!=null){
            httpService.unregister(contextPath +"/app/plan/departmentplan");
            httpService.unregister(contextPath +"/app/plan/departmentplansearch");
        }
        if (reference != null)
            bundleContext.ungetService(reference);
    }
}
