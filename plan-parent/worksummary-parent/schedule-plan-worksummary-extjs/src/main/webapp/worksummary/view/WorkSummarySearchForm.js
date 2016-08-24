/**
 * 工作总结查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.worksummary.view.WorkSummarySearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    alias: 'widget.worksummarySearchForm',
    xtype: 'worksummarySearchForm',
    storeId: 'worksummaryStore',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '用户id',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'userId',
            hidden: true
        },
        {
            xtype: 'textfield',
            fieldLabel: '用户名',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'userName',
            hidden: true
        },
        {
            xtype: 'textfield',
            fieldLabel: '部门code',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'orgCode',
            hidden: true
        },
        {
            xtype: 'textfield',
            fieldLabel: '部门id',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'orgId',
            hidden: true
        },
        {
            xtype: 'textfield',
            fieldLabel: '部门名',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'orgName',
            hidden: true
        },
        {
            xtype: 'textfield',
            fieldLabel: '标题',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'title'
        },
        {
            xtype: 'textfield',
            fieldLabel: '内容',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'content',
            hidden: true
        },
        {
            fieldLabel: '总结类型',
            xtype: 'scheduleDictCombobox',
            dictType: '总结类型',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'workType'
        },
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
            name: 'endDate:begin:gt',
            hidden: true
        },
        {
            xtype: 'displayfield',
            hideLabel: true,
            value: '-',
            margin: '0 5 0 5',
            hidden: true
        },
        {
            xtype: 'datefield',
            format: 'Y-m-d',
            headLabel: true,
            labelAlign: 'right',
            width: 140,
            name: 'endDate:end:lt',
            hidden: true
        }
    ]
});
