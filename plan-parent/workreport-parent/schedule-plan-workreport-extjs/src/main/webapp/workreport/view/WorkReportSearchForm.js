/**
 * 工作汇报查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.workreport.view.WorkReportSearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.view.MultiComboBox'
    ],
    alias: 'widget.workreportSearchForm',
    xtype: 'workreportSearchForm',
    storeId: 'workreportStore',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '用户姓名',
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
            name: 'orgCode%',
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
            name: 'title',
            hidden: true
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
            fieldLabel: '汇报类型',
            xtype: 'scheduleDictCombobox',
            dictType: '汇报类型',
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
            labelWidth: 60,
            width: 200,
            name: 'beginDate:begin:gt'
        },
        {
            xtype: 'label',
            text: '-',
            margin: '5 5 0 5'
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
