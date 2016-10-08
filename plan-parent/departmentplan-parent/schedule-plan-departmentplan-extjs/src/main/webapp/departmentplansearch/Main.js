/**
 * Created by Administrator on 2016/8/12.
 */
Ext.define('kalix.plan.departmentplansearch.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.plan.departmentplan.controller.DepartmentPlanSearchController',
        'kalix.plan.departmentplan.component.DepartmentPlanUserOrgTreeList',
        'kalix.plan.departmentplan.DepartmentPlanSearchMain',
        'kalix.container.BaseTreeContainer'
    ],
    xtype: 'departmentplansearchPanel',
    controller: 'departmentplansearchController',
    items: [
        {
            xtype:'baseTreeContainer',
            width:400,
            title:'机构列表',
            iconCls: 'iconfont icon-organization-management',
            childItemMargin:0,
            tree: {
                xtype: 'departmentplanuserorgtreeList',
                title:'',
                iconCls:'',
                tbar:null,
                listeners: {
                    select: 'onItemClick',
                    load: 'onLoad'
                }
            }
        },
        {
            xtype: 'departmentplansearchMain',
            flex: 1
        }
    ]
});