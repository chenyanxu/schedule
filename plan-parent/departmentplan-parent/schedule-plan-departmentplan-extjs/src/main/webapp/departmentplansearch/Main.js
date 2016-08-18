/**
 * Created by Administrator on 2016/8/12.
 */
Ext.define('kalix.plan.departmentplansearch.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.plan.departmentplan.controller.DepartmentPlanSearchController',
        'kalix.plan.departmentplan.component.DepartmentPlanUserOrgTreeList',
        'kalix.plan.departmentplan.DepartmentPlanSearchMain'
    ],
    xtype: 'departmentplansearchPanel',
    controller: 'departmentplansearchController',
    items: [
        {
            xtype: 'departmentplanuserorgtreeList',
            flex: 1,
            listeners: {
                itemClick: 'onItemClick',
                load: 'onLoad'
            }
        },
        {
            xtype: 'departmentplansearchMain',
            flex: 3
        }
    ]
});