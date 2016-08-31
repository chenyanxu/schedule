/**
 * 布置任务查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignmentcharts.view.StatisticsSearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    alias: 'widget.statisticsSearchForm',
    requires: [
        'kalix.task.assignmentcharts.controller.StatisticsSearchFormController'
    ],
    xtype: 'statisticsSearchForm',
    controller:{
        type: 'statisticsSearchFormController'
    },
    bodyPadding:0,
    margin: '0 0 10 0',
    items: [
        {
            xtype: 'datefield',
            format: 'Y-m-d',
            fieldLabel: '开始日期:',
            labelAlign: 'right',
            labelWidth: 120,
            width: 260,
            name: 'beginDate:begin:gt'
        },
        {
            xtype: 'displayfield',
            hideLabel: true,
            value: '-',
            margin: '0 5 0 5'
        },
        {
            xtype: 'datefield',
            format: 'Y-m-d',
            headLabel: true,
            labelAlign: 'right',
            width: 140,
            name: 'beginDate:end:lt'
        },
        {
            xtype: 'datefield',
            format: 'Y-m-d',
            fieldLabel: '结束日期:',
            labelAlign: 'right',
            labelWidth: 120,
            width: 260,
            name: 'endDate:begin:gt'
        },
        {
            xtype: 'displayfield',
            hideLabel: true,
            value: '-',
            margin: '0 5 0 5'
        },
        {
            xtype: 'datefield',
            format: 'Y-m-d',
            headLabel: true,
            labelAlign: 'right',
            width: 140,
            name: 'endDate:end:lt'
        }
    ]
});
