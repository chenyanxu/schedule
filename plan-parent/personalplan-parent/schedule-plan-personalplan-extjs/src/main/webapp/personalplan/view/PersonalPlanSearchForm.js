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
        'kalix.admin.user.component.UserOrgComboBox',
        'kalix.view.MultiComboBox'
    ],
    storeId: 'personalplanStore',
    items: [
        {
            xtype: 'multiComboBox',
            valueFieldName: 'userId:in',
            displayText: '用    户',
            menuItemValue: 'id',
            menuItemText: 'name',
            storeUrl: '/kalix/camel/rest/users/' + Ext.util.Cookies.get('currentUserId') + '/orgs/all/users',
            'callback': function () {
                var store = this.findParentByType('personalplanSearchForm').gridStore;
                if (store) {
                    store.currentPage = 1;
                    store.load();
                }
            }
        },
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
            dictType: '个人计划类型',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'planType'
        },
        {
            fieldLabel: '计划状态',
            xtype: 'scheduleDictCombobox',
            dictType: '个人计划状态',
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
