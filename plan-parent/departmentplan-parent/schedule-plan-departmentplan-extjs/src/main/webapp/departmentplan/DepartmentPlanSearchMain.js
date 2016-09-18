/**
 * Created by Administrator on 2016/8/16.
 */
Ext.define('kalix.plan.departmentplan.DepartmentPlanSearchMain', {
    extend: 'kalix.container.BaseContainer',
    alias: 'widget.departmentplansearchMain',
    xtype: 'departmentplansearchMain',
    requires: [
        'kalix.plan.departmentplan.view.DepartmentPlanSearchGrid',
        'kalix.plan.departmentplan.view.DepartmentPlanSearchForm',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    //==custom property
    notMargin: true, //config the true for parent not margin this container
    //custom property
    items: [
        {
            title: '部门计划查询',
            xtype: 'departmentplanSearchForm'
        },
        {
            xtype: 'departmentplansearchGridPanel',
            id: 'departmentplansearchGridPanel',
            title: '部门计划列表'
        }
    ]
});