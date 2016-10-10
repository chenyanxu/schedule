/**
 * 布置任务数据仓库
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.store.ProgressStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.task.assignment.model.ProgressModel',
    alias: 'store.progressStore',
    xtype: 'progressStore',
    storeId: 'progressStore',
    autoLoad: true,
    proxyUrl: CONFIG.restRoot + '/camel/rest/progresss'
});