/**
 * 布置任务首页
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.task.assignment.view.AssignmentGrid',
        'kalix.task.assignment.view.AssignmentSearchForm'
    ],
    items: [
        {
            title: '布置任务查询',
            xtype: 'assignmentSearchForm'
        },
        {
            xtype: 'assignmentGridPanel',
            id: 'assignmentGridPanel',
            title: '布置任务列表'
        }
    ]
});
