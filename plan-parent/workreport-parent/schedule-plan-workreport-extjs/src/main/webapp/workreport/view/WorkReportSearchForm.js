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
    //==custom property
    isHiddenMultiComboBox: true,
    //custom property
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '部门code',
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
                var store = this.findParentByType('workreportSearchForm').gridStore;
                if (store) {
                    store.currentPage = 1;
                    store.load();
                }
            },
            listeners: {
                'render': function() {
                    var isHidden = this.findParentByType('workreportSearchForm').isHiddenMultiComboBox;
                    if (isHidden) {
                        this.hidden = true;
                    }
                }
            }
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
        }
    ]
});
