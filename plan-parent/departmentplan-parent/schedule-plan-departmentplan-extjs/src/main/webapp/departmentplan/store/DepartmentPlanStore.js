/**
 * 部门计划数据仓库
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.store.DepartmentPlanStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.plan.departmentplan.model.DepartmentPlanModel',
    alias: 'store.departmentplanStore',
    xtype: 'departmentplanStore',
    storeId: "departmentplanStore",
    autoLoad: true,
    proxyUrl: CONFIG.restRoot + '/camel/rest/departmentplans'
});