/**
 * Created by Administrator on 2016/8/26.
 */

Ext.define('kalix.plan.workreport.store.PlanStore', {
    extend: 'kalix.store.BaseStore',
    alias: 'store.planStore',
    xtype: 'planStore',
    storeId: "planStore",
    fields: ['name', 'value'],
    data : [
        {"name": "个人计划", "value": "1"},
        {"name": "部门计划", "value": "2"}
    ]
});