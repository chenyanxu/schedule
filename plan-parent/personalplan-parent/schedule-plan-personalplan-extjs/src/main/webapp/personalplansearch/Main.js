/**
 * Created by Administrator on 2016/8/12.
 */
Ext.define('kalix.plan.personalplansearch.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.plan.personalplan.controller.PersonalPlanSearchController',
        'kalix.admin.org.view.UserOrgTreeList',
        'kalix.plan.personalplan.PersonalPlanSearchMain'
    ],
    xtype: 'personalplansearchPanel',
    controller: 'personalplansearchController',
    items: [
        {
            xtype: 'userorgtreelist',
            flex: 1,
            listeners: {
                itemClick: 'onItemClick'
            }
        },
        {
            xtype: 'personalplansearchMain',
            flex: 3
        }
    ]
});