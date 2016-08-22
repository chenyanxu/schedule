/**
 * 工作汇报数据仓库
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.workreport.store.WorkReportStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.plan.workreport.model.WorkReportModel',
    alias: 'store.workreportStore',
    xtype: 'workreportStore',
    storeId: "workreportStore",
    proxyUrl: '/kalix/camel/rest/workreports'
});