/**
 * 部门计划查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.view.DepartmentPlanSearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    alias: 'widget.departmentplanSearchForm',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.view.MultiComboBox'
    ],
    xtype: 'departmentplanSearchForm',
    storeId: 'departmentplanStore',
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
            name: 'code%:relation:OrganizationBean',
            hidden: true
        },
        {
            xtype: 'multiComboBox',
            valueFieldName: 'userId:in',
            displayText: '用    户',
            menuItemValue: 'id',
            menuItemText: 'name',
            storeUrl: CONFIG.restRoot + '/camel/rest/users/' + Ext.util.Cookies.get('currentUserId') + '/orgs/all/users',
            'callback': function () {
                var store = this.findParentByType('departmentplanSearchForm').gridStore;
                if (store) {
                    store.currentPage = 1;
                    store.load();
                }
            },
            listeners: {
                'render': function() {
                    var isHidden = this.findParentByType('departmentplanSearchForm').isHiddenMultiComboBox;
                    if (isHidden) {
                        this.hidden = true;
                    }
                }
            }
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
        }
    ]
});
