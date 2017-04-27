/**
 * 任务模板数据仓库
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.store.TemplateStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.schedule.template.model.TemplateModel',
    alias: 'store.templateStore',
    xtype: 'templateStore',
    storeId: 'templateStore',
    autoLoad: true,
    proxyUrl: CONFIG.restRoot + '/camel/rest/templates'
});