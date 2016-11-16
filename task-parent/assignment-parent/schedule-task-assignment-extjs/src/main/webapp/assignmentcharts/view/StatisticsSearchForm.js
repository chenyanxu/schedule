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
    margin: '0 0 5 0',
    items: [
        {
            xtype: 'datefield',
            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
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
            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
            headLabel: true,
            labelAlign: 'right',
            width: 140,
            name: 'beginDate:end:lt'
        },
        {
            xtype: 'datefield',
            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
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
            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
            headLabel: true,
            labelAlign: 'right',
            width: 140,
            name: 'endDate:end:lt'
        },
        {
            xtype: 'textfield',
            fieldLabel: '部门code',
            itemId: 'orgCode',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            hidden: true
        }
    ]
});
