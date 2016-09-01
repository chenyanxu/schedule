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
        'kalix.task.assignmentcharts.controller.AssignmentChartController',
        'kalix.task.assignmentcharts.view.AssignmentStatisticsGrid',
        'kalix.task.assignmentcharts.view.StatisticsSearchForm'
    ],
    controller: {
        type: 'assignmentChartController'
    },
    items: [
        {
            flex:1,
            margin: '10 10 10 10',
            items: [
                {
                    xtype: 'userorgtreelist',
                    reference:'userorgtreelist',
                    flex: 1,
                    listeners: {
                        itemClick: 'onItemClick'
                    }
                }
            ]
        },
        {
            flex: 3,
            bodyPadding: 10,
            items: [
                {
                    title: '布置任务查询',
                    xtype: 'statisticsSearchForm'
                },
                {
                    xtype: 'assignmentStatisticsGridPanel',
                    id: 'assignmentStatisticsGridPanel',
                    title: '任务统计'
                },
                {
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'assignmentColumnChartView',
                            id: 'assignmentColumnChartView',
                            title: '柱状图'
                        },
                        {
                            xtype: 'assignmentPieChartView',
                            id: 'assignmentPieChartView',
                            title: '饼状图'
                        }
                    ]
                }
            ]
        }
    ]
})
;
