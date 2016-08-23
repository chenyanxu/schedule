/**
 * Created by Administrator on 2016/8/18.
 */
Ext.define('kalix.plan.workreport.component.WorkReportUserOrgTreeList', {
    extend: 'kalix.admin.org.view.UserOrgTreeList',
    requires: [
        'kalix.admin.org.view.UserOrgTreeList'
    ],
    alias: 'widget.workreportuserorgtreeList',
    xtype: 'workreportuserorgtreeList',
    store:  Ext.create('kalix.admin.org.store.UserOrgStore')
});