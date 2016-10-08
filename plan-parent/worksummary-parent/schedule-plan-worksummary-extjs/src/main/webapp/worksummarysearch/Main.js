/**
 * Created by Administrator on 2016/8/12.
 */
Ext.define('kalix.plan.worksummarysearch.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.plan.worksummary.controller.WorkSummarySearchController',
        'kalix.plan.worksummary.component.WorkSummaryUserOrgTreeList',
        'kalix.plan.worksummary.WorkSummarySearchMain',
        'kalix.container.BaseTreeContainer'
    ],
    xtype: 'worksummarysearchPanel',
    controller: 'worksummarysearchController',
    items: [
        {
            xtype:'baseTreeContainer',
            width:400,
            title:'机构列表',
            iconCls: 'iconfont icon-organization-management',
            childItemMargin:0,
            tree: {
                xtype: 'worksummaryuserorgtreeList',
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
            xtype: 'worksummarysearchMain',
            flex: 1
        }
    ]
});