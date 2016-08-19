/**
 * 布置任务数据仓库
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.store.ReadingStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.task.assignment.model.ReadingModel',
    alias: 'store.readingStore',
    xtype: 'readingStore',
    storeId: 'readingStore',
    autoLoad: true,
    proxyUrl: '/kalix/camel/rest/assignments/-1/readings'
});