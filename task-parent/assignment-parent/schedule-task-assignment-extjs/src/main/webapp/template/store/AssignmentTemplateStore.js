/**
 * 任务模板数据仓库
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.store.AssignmentTemplateStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.schedule.template.model.AssignmentTemplateModel',
    alias: 'store.assignmentTemplateStore',
    xtype: 'assignmentTemplateStore',
    storeId: "assignmentTemplateStore",
    proxyUrl: CONFIG.restRoot + '/camel/rest/assignment-templates'
});