/**
 * 字典数据仓库
 *
 * @author chenyanxu
 */
Ext.define('kalix.schedule.scheduleDict.store.ScheduleDictCacheStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.dict.model.DictModel',
    alias: 'store.scheduleDictCacheStore',
    xtype: 'scheduleDictCacheStore',
    storeId: 'scheduleDictCacheStore',
    pageSize:0,
    autoLscheduled:true,
    singleton: true,
    proxyUrl: CONFIG.restRoot + '/camel/rest/schedule/dicts/cache/list'
});