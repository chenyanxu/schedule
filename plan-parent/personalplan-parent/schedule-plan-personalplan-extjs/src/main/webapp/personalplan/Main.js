/**
 * 个人计划首页
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.personalplan.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.plan.personalplan.view.PersonalPlanGrid',
        'kalix.plan.personalplan.view.PersonalPlanSearchForm',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],

    items: [
        {
            title: '个人计划查询',
            xtype: 'personalplanSearchForm'
        }, {
            xtype: 'personalplanGridPanel',
            id: 'personalplanGridPanel',
            title: '个人计划列表',
            margin: 10
        }
    ]
});
