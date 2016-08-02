/**
 * @author chenyanxu
 */
Ext.define('kalix.schedule.scheduleDict.component.ScheduleDictCombobox', {
    extend: 'kalix.dict.component.DictCombobox',
    alias: 'widget.scheduleDictCombobox',
    xtype: 'scheduleDictCombobox',
    storeClass:'kalix.schedule.scheduleDict.store.ScheduleDictCacheStore'
});