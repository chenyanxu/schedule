/**
 * Created by Administrator on 2016/8/16.
 */
Ext.define('kalix.plan.personalplan.PersonalPlanSearchMain', {
    extend: 'kalix.container.BaseContainer',
    alias: 'widget.personalplansearchMain',
    xtype: 'personalplansearchMain',
    requires: [
        'kalix.plan.personalplan.view.PersonalPlanSearchGrid',
        'kalix.plan.personalplan.view.PersonalPlanSearchForm',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    //==custom property
    notMargin: true, //config the true for parent not margin this container
    //custom property
    items: [
        {
            title: '个人计划查询',
            xtype: 'personalplanSearchForm'
        },
        {
            xtype: 'personalplansearchGridPanel',
            id: 'personalplansearchGridPanel',
            title: '个人计划列表'
        }
    ]
});