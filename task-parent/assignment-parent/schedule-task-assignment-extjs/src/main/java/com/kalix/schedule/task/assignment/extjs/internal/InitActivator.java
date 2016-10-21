package com.kalix.schedule.task.assignment.extjs.internal;

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
        SystemUtil.startBundlePrintln(bundleContext);

        reference = bundleContext.getServiceReference(HttpService.class.getName());
        httpService = (HttpService) bundleContext.getService(reference);

        if(deploy){
            httpService.registerResources(contextPath + "/app/schedule/template", "/min/template", null);
            httpService.registerResources(contextPath + "/app/task/assignment", "/min/assignment", null);
            httpService.registerResources(contextPath + "/app/task/assignmentcharts", "/min/assignmentcharts", null);
        }
        else{
            httpService.registerResources(contextPath + "/app/schedule/template", "/template", null);
            httpService.registerResources(contextPath + "/app/task/assignment", "/assignment", null);
            httpService.registerResources(contextPath + "/app/task/assignmentcharts", "/assignmentcharts", null);
        }
    }

    @Override
    public void stop(BundleContext bundleContext) throws Exception {
        SystemUtil.stopBundlePrintln(bundleContext);

        if(httpService!=null){
            httpService.unregister(contextPath +"/app/schedule/template");
            httpService.unregister(contextPath +"/app/task/assignment");
            httpService.unregister(contextPath +"/app/task/assignmentcharts");
        }
        if (reference != null)
            bundleContext.ungetService(reference);
    }
}
