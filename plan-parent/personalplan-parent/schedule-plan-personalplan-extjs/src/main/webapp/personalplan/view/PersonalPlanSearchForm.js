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
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.view.MultiComboBox'
    ],
    storeId: 'personalplanStore',
    //==custom property
    isHiddenMultiComboBox: true,
    //custom property
    items: [
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
            },
            listeners: {
                'render': function() {
                    var isHidden = this.findParentByType('personalplanSearchForm').isHiddenMultiComboBox;
                    if (isHidden) {
                        this.hidden = true;
                    }
                }
            }
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
        }
    ]
});
