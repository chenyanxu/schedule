/**
 * Created by Administrator on 2016/8/12.
 */
Ext.define('kalix.plan.departmentplansearch.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.plan.departmentplan.controller.DepartmentPlanSearchController',
        'kalix.admin.org.view.UserOrgTreeList',
        'kalix.plan.departmentplan.DepartmentPlanSearchMain'
    ],
    xtype: 'departmentplansearchPanel',
    controller: 'departmentplansearchController',
    items: [
        {
            xtype: 'userorgtreelist',
            flex: 1,
            listeners: {
                itemClick: 'onItemClick'
            }
        },
        {
            xtype: 'departmentplansearchMain',
            flex: 3
        }
    ]
});