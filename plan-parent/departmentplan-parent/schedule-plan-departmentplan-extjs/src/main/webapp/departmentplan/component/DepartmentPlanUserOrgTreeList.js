/**
 * Created by Administrator on 2016/8/18.
 */
Ext.define('kalix.plan.departmentplan.component.DepartmentPlanUserOrgTreeList', {
    extend: 'kalix.admin.org.view.UserOrgTreeList',
    requires: [
        'kalix.admin.org.view.UserOrgTreeList'
    ],
    alias: 'widget.departmentplanuserorgtreeList',
    xtype: 'departmentplanuserorgtreeList',
    store:  Ext.create('kalix.admin.org.store.UserOrgStore')
});