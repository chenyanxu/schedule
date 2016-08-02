/**
 *
 * Dict extJs use new base dict components
 * @author chenyanxu
 */
Ext.define('kalix.schedule.scheduleDict.Main', {
    extend: 'kalix.dict.Main',
    requires: [
        'kalix.dict.view.DictGrid',
        'kalix.dict.view.DictSearchForm',
        'kalix.schedule.scheduleDict.store.ScheduleDictStore'
    ]
});