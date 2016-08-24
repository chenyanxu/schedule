/**
 * Created by Administrator on 2016/8/12.
 */
Ext.define('kalix.plan.workreportsearch.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.plan.workreport.controller.WorkReportSearchController',
        'kalix.plan.workreport.component.WorkReportUserOrgTreeList',
        'kalix.plan.workreport.WorkReportSearchMain'
    ],
    xtype: 'workreportsearchPanel',
    controller: 'workreportsearchController',
    items: [
        {
            xtype: 'workreportuserorgtreeList',
            flex: 1,
            listeners: {
                itemClick: 'onItemClick',
                load: 'onLoad'
            }
        },
        {
            xtype: 'workreportsearchMain',
            flex: 3
        }
    ]
});