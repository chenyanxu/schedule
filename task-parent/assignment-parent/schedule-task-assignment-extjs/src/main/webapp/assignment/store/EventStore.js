/**
 * 布置任务数据仓库
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.store.EventStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.task.assignment.model.EventModel',
    alias: 'store.eventStore',
    xtype: 'eventStore',
    storeId: 'eventStore',
    autoLoad: true,
    proxyUrl: CONFIG.restRoot + '/camel/rest/assignments/-1/events'
});