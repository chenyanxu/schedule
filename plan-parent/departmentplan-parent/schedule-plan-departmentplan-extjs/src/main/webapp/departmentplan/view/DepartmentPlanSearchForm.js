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
            fieldLabel: '用户ID',
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
            fieldLabel: '部门ID',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'departmentId',
            hidden: true
        },
        {
            xtype: 'textfield',
            fieldLabel: '部门名称',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'departmentName'
        },
        {
            xtype: 'textfield',
            fieldLabel: '计划标题',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'title'
        },
        {
            fieldLabel: '计划类型',
            xtype: 'scheduleDictCombobox',
            dictType: '计划类型',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'planType'
        },
        {
            xtype: 'datefield',
            format: 'Y-m-d',
            fieldLabel: '计划开始时间:',
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
            xtype: 'textfield',
            fieldLabel: '计划状态',
            xtype: 'scheduleDictCombobox',
            dictType: '计划状态',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'state'
        }
    ]
});
