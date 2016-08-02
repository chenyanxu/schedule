/**
 * 字典数据仓库
 *
 * @author chenyanxu
 */
Ext.define('kalix.schedule.scheduleDict.store.ScheduleDictStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.dict.model.DictModel',
    alias: 'store.scheduleDictStore',
    xtype: 'scheduleDictStore',
    storeId: 'scheduleDictStore',
    proxyUrl: CONFIG.restRoot + '/camel/rest/schedule/dicts'
});