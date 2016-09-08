/**
 * Created by Administrator on 2016/8/12.
 */
Ext.define('kalix.plan.workreportsearch.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.plan.workreport.controller.WorkReportSearchController',
        'kalix.plan.workreport.component.WorkReportUserOrgTreeList',
        'kalix.plan.workreport.WorkReportSearchMain',
        'kalix.container.BaseTreeContainer'
    ],
    xtype: 'workreportsearchPanel',
    controller: 'workreportsearchController',
    items: [
        {
            xtype:'baseTreeContainer',
            width:400,
            childItemMargin:0,
            tree: {
                xtype: 'workreportuserorgtreeList',
                listeners: {
                    select: 'onItemClick',
                    load: 'onLoad'
                }
            }
        },
        {
            xtype: 'workreportsearchMain'
        }
    ]
});