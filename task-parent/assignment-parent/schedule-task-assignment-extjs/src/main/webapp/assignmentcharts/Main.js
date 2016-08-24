/**
 * 布置任务首页
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignmentcharts.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.task.assignment.view.AssignmentSearchForm',
        'kalix.task.assignmentcharts.view.AssignmentChartView'
    ],
    items: [
        //{
        //    title: '布置任务查询',
        //    xtype: 'assignmentSearchForm'
        //},
        {
            xtype: 'assignmentChartView',
            id: 'assignmentChartView',
            title: '柱状图',
            margin: 10
        }
    ]
});
