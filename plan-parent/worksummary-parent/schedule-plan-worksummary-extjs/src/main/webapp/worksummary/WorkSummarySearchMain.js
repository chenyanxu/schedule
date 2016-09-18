/**
 * Created by Administrator on 2016/8/16.
 */
Ext.define('kalix.plan.worksummary.WorkSummarySearchMain', {
    extend: 'kalix.container.BaseContainer',
    alias: 'widget.worksummarysearchMain',
    xtype: 'worksummarysearchMain',
    requires: [
        'kalix.plan.worksummary.view.WorkSummarySearchGrid',
        'kalix.plan.worksummary.view.WorkSummarySearchForm',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    //==custom property
    notMargin: true, //config the true for parent not margin this container
    //custom property
    items: [
        {
            title: '工作总结查询',
            xtype: 'worksummarySearchForm'
        },
        {
            xtype: 'worksummarysearchGridPanel',
            id: 'worksummarysearchGridPanel',
            title: '工作总结列表'
        }
    ]
});