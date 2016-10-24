package com.kalix.schedule.plan.personalplan.extjs.internal;

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
            httpService.registerResources(contextPath + "/app/plan/personalplan", "/min/personalplan", null);
            httpService.registerResources(contextPath + "/app/plan/personalplansearch", "/min/personalplansearch", null);
        }
        else{
            httpService.registerResources(contextPath + "/app/plan/personalplan", "/personalplan", null);
            httpService.registerResources(contextPath + "/app/plan/personalplansearch", "/personalplansearch", null);
        }
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        super.stop(bundleContext);

        if(httpService!=null){
            httpService.unregister(contextPath +"/app/plan/personalplan");
            httpService.unregister(contextPath +"/app/plan/personalplansearch");
        }
        if (reference != null)
            bundleContext.ungetService(reference);
    }
}
