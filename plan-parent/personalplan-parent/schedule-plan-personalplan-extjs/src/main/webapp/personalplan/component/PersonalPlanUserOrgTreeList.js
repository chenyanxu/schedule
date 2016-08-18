/**
 * Created by Administrator on 2016/8/18.
 */
Ext.define('kalix.plan.personalplan.component.PersonalPlanUserOrgTreeList', {
    extend: 'kalix.admin.org.view.UserOrgTreeList',
    requires: [
        'kalix.admin.org.view.UserOrgTreeList'
    ],
    alias: 'widget.personalplanuserorgtreeList',
    xtype: 'personalplanuserorgtreeList',
    store:  Ext.create('kalix.admin.org.store.UserOrgStore')
});