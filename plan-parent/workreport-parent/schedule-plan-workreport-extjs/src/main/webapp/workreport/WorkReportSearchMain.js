/**
 * Created by Administrator on 2016/8/16.
 */
Ext.define('kalix.plan.workreport.WorkReportSearchMain', {
    extend: 'kalix.container.BaseContainer',
    alias: 'widget.workreportsearchMain',
    xtype: 'workreportsearchMain',
    requires: [
        'kalix.plan.workreport.view.WorkReportSearchGrid',
        'kalix.plan.workreport.view.WorkReportSearchForm'
    ],
    //==custom property
    notMargin: true, //config the true for parent not margin this container
    //custom property
    items: [
        {
            title: '工作汇报查询',
            xtype: 'workreportSearchForm',
            isHiddenMultiComboBox: false
        },
        {
            xtype: 'workreportsearchGridPanel',
            id: 'workreportsearchGridPanel',
            title: '工作汇报列表'
        }
    ]
});