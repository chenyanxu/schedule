/**
 * 布置任务查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.AssignmentSearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    alias: 'widget.assignmentSearchForm',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    xtype: 'assignmentSearchForm',
    storeId: 'assignmentStore',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '部门id',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'departmentId',
            hidden: true
        },
        {
            xtype: 'textfield',
            fieldLabel: '部门名称',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'departmentName',
            hidden: true
        },
        {
            xtype: 'textfield',
            fieldLabel: '任务名称',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'title'
        },
        {
            xtype: 'textfield',
            fieldLabel: '任务状态',
            xtype: 'scheduleDictCombobox',
            dictType: '任务状态',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'state'
        },
        {
            xtype: 'textfield',
            fieldLabel: '负责人',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'head'
        },
        {
            xtype: 'textfield',
            fieldLabel: '布置人',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'createBy'
        }
    ]
});
