Ext.define('kalix.task.assignmentcharts.store.AssignmentStatisticsStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.task.assignmentcharts.model.AssignmentStatisticsModel',
    alias: 'store.assignmentStatisticsStore',
    xtype: 'assignmentStatisticsStore',
    storeId: 'assignmentStatisticsStore',
    autoLoad: true,
    proxyUrl: '/kalix/camel/rest/assignmentstatistics/query'
});