/**
 * Created by Administrator on 2016/8/12.
 */
Ext.define('kalix.plan.personalplansearch.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.plan.personalplan.controller.PersonalPlanSearchController',
        'kalix.plan.personalplan.component.PersonalPlanUserOrgTreeList',
        'kalix.plan.personalplan.PersonalPlanSearchMain'
    ],
    xtype: 'personalplansearchPanel',
    controller: 'personalplansearchController',
    items: [
        {
            xtype: 'personalplanuserorgtreeList',
            flex: 1,
            listeners: {
                itemClick: 'onItemClick',
                load: 'onLoad'
            }
        },
        {
            xtype: 'personalplansearchMain',
            flex: 3
        }
    ]
});