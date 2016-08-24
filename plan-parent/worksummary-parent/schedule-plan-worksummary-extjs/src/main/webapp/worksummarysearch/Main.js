/**
 * Created by Administrator on 2016/8/12.
 */
Ext.define('kalix.plan.worksummarysearch.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.plan.worksummary.controller.WorkSummarySearchController',
        'kalix.plan.worksummary.component.WorkSummaryUserOrgTreeList',
        'kalix.plan.worksummary.WorkSummarySearchMain'
    ],
    xtype: 'worksummarysearchPanel',
    controller: 'worksummarysearchController',
    items: [
        {
            xtype: 'worksummaryuserorgtreeList',
            flex: 1,
            listeners: {
                itemClick: 'onItemClick',
                load: 'onLoad'
            }
        },
        {
            xtype: 'worksummarysearchMain',
            flex: 3
        }
    ]
});