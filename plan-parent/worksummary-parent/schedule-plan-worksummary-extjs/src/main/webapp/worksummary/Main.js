/**
 * 工作总结首页
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.worksummary.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.plan.worksummary.view.WorkSummaryGrid',
        'kalix.plan.worksummary.view.WorkSummarySearchForm'
    ],
    items: [
        {
            title: '工作总结查询',
            xtype: 'worksummarySearchForm'
        }, {
            xtype: 'worksummaryGridPanel',
            id: 'worksummaryGridPanel',
            title: '工作总结列表'
        }
    ]
});
