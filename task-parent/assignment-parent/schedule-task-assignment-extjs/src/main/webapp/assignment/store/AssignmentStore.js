/**
 * 布置任务数据仓库
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.store.AssignmentStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.task.assignment.model.AssignmentModel',
    alias: 'store.assignmentStore',
    xtype: 'assignmentStore',
    storeId: 'assignmentStore',
    autoLoad: false,
    proxyUrl: CONFIG.restRoot + '/camel/rest/assignments'
});