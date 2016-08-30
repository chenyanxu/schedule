/**
 * 布置任务首页
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignmentcharts.Main', {
    extend: 'kalix.view.components.common.AutoHPanel',
    requires: [
        'kalix.task.assignment.view.AssignmentSearchForm',
        'kalix.task.assignmentcharts.view.AssignmentColumnChartView',
        'kalix.task.assignmentcharts.view.AssignmentPieChartView',
        'kalix.admin.org.view.UserOrgTreeList',
        'kalix.task.assignmentcharts.controller.AssignmentChartController'
    ],
    controller: {
        type: 'assignmentChartController'
    },
    items: [
        //{
        //    title: '布置任务查询',
        //    xtype: 'assignmentSearchForm'
        //},

        {
            xtype: 'userorgtreelist',
            flex: 1,
            listeners: {
                itemClick: 'onItemClick'
            }
        },
        {
            xtype: 'assignmentColumnChartView',
            id: 'assignmentColumnChartView',
            title: '柱状图',
            flex: 2
        },
        {
            xtype: 'assignmentPieChartView',
            id: 'assignmentPieChartView',
            title: '饼状图',
            flex: 2
        }
    ]
});
