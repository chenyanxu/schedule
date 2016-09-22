/**
 * 部门计划查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.view.DepartmentPlanSearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    alias: 'widget.departmentplanSearchForm',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    xtype: 'departmentplanSearchForm',
    storeId: 'departmentplanStore',
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
            fieldLabel: '用户姓名',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'userName'
        },
        {
            xtype: 'textfield',
            fieldLabel: '部门code',
            itemId: 'orgCode',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'orgCode',
            hidden: true
        },
        {
            xtype: 'textfield',
            fieldLabel: '部门名称',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'departmentName',
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
            fieldLabel: '计划类型',
            xtype: 'scheduleDictCombobox',
            dictType: '部门计划类型',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'planType'
        },
        {
            fieldLabel: '计划状态',
            xtype: 'scheduleDictCombobox',
            dictType: '部门计划状态',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'state'
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
