/**
 * 部门计划首页
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.plan.departmentplan.view.DepartmentPlanGrid',
        'kalix.plan.departmentplan.view.DepartmentPlanSearchForm'
    ],
    items: [
        {
            title: '部门计划查询',
            xtype: 'departmentplanSearchForm'
        }, {
            xtype: 'departmentplanGridPanel',
            id: 'departmentplanGridPanel',
            title: '部门计划列表',
            margin: 10
        }
    ]
});
