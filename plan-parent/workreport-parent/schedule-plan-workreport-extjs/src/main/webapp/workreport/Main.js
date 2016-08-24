/**
 * 工作汇报首页
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.workreport.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.plan.workreport.view.WorkReportGrid',
        'kalix.plan.workreport.view.WorkReportSearchForm'
    ],
    items: [
        {
            title: '工作汇报查询',
            xtype: 'workreportSearchForm'
        }, {
            xtype: 'workreportGridPanel',
            id: 'workreportGridPanel',
            title: '工作汇报列表',
            margin: 10
        }
    ]
});
