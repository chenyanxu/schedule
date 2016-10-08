/**
 * Created by Administrator on 2016/8/12.
 */
Ext.define('kalix.plan.personalplansearch.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.plan.personalplan.controller.PersonalPlanSearchController',
        'kalix.plan.personalplan.component.PersonalPlanUserOrgTreeList',
        'kalix.plan.personalplan.PersonalPlanSearchMain',
        'kalix.container.BaseTreeContainer'
    ],
    xtype: 'personalplansearchPanel',
    controller: 'personalplansearchController',
    items: [
        {
            xtype:'baseTreeContainer',
            width:400,
            title:'机构列表',
            iconCls: 'iconfont icon-organization-management',
            childItemMargin:0,
            tree: {
                xtype: 'personalplanuserorgtreeList',
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
            xtype: 'personalplansearchMain',
            flex: 1
        }
    ]
});