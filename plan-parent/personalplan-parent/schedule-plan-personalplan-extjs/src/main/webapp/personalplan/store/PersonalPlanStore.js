/**
 * 个人计划数据仓库
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.personalplan.store.PersonalPlanStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.plan.personalplan.model.PersonalPlanModel',
    alias: 'store.personalplanStore',
    xtype: 'personalplanStore',
    storeId: "personalplanStore",
    proxyUrl: '/kalix/camel/rest/personalplans'
});