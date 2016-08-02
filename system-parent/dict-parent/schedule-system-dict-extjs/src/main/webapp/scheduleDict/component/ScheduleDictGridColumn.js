/**
 * @author chenyanxu
 */
Ext.define('kalix.schedule.scheduleDict.component.ScheduleDictGridColumn', {
    extend: 'kalix.dict.component.DictGridColumn',
    alias: 'widget.scheduleDictGridColumn',
    xtype: 'scheduleDictGridColumn',
    storeClass:'kalix.schedule.scheduleDict.store.ScheduleDictCacheStore'
});