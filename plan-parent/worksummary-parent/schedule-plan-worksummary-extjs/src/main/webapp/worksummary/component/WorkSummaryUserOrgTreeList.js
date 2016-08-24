/**
 * Created by Administrator on 2016/8/18.
 */
Ext.define('kalix.plan.worksummary.component.WorkSummaryUserOrgTreeList', {
    extend: 'kalix.admin.org.view.UserOrgTreeList',
    requires: [
        'kalix.admin.org.view.UserOrgTreeList'
    ],
    alias: 'widget.worksummaryuserorgtreeList',
    xtype: 'worksummaryuserorgtreeList',
    store:  Ext.create('kalix.admin.org.store.UserOrgStore')
});