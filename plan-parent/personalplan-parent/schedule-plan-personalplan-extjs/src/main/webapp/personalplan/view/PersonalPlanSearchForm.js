/**
 * 个人计划查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.personalplan.view.PersonalPlanSearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    alias: 'widget.personalplanSearchForm',
    xtype: 'personalplanSearchForm',
    requires: [
        'kalix.admin.user.component.UserTagField',
        'kalix.admin.user.component.UserOrgComboBox'
    ],
    storeId: 'personalplanStore',
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
            fieldLabel: '用户',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'userName',
            hidden: true
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
            fieldLabel: '部门',
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
            fieldLabel: '计划类型',
            xtype: 'scheduleDictCombobox',
            dictType: '计划类型',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'planType'
        },
        {
            fieldLabel: '计划状态',
            xtype: 'scheduleDictCombobox',
            dictType: '计划状态',
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
