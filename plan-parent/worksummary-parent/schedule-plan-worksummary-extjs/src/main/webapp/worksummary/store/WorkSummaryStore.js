/**
 * 工作总结数据仓库
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.worksummary.store.WorkSummaryStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.plan.worksummary.model.WorkSummaryModel',
    alias: 'store.worksummaryStore',
    xtype: 'worksummaryStore',
    storeId: 'worksummaryStore',
    proxyUrl: CONFIG.restRoot + '/camel/rest/worksummarys'
});