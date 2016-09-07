/**
 * 任务统计首页
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
        'kalix.task.assignmentcharts.view.StatisticsSearchForm',
        'kalix.container.BaseTreeContainer'
    ],
    controller: {
        type: 'assignmentChartController'
    },
    items: [
        //{
        //    xtype: 'userorgtreelist',
        //    reference:'userorgtreelist',
        //    flex: 0,
        //    width: 400,
        //    listeners: {
        //        itemClick: 'onItemClick'
        //    }
        //},
        {
            xtype:'baseTreeContainer',
            width:400,
            childItemMargin:0,
            tree: {
                xtype: 'userorgtreelist',
                reference:'userorgtreelist',
                listeners: {
                    select: 'onItemClick'

                }
            }
        },
        {
            flex: 1,
            border:0,
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
                    border: 0,
                    margin:'5 0 0 0',
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
