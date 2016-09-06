/**
 * This example shows how to create a 3D Pie chart.
 *
 * The example makes use of the 'rotate' interaction. To use it, click or tap and then
 * drag anywhere on the chart.
 */
Ext.define('kalix.task.assignmentcharts.view.AssignmentPieChartView', {
    extend: 'Ext.Panel',
    alias: 'widget.AssignmentPieChartView',
    xtype: 'assignmentPieChartView',
    requires: [
        'Ext.draw.gradient.Radial',
        'Ext.draw.sprite.Sprite',
        'Ext.chart.theme.Muted',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.PolarChart',
        'Ext.chart.series.Polar',
        'Ext.chart.series.Pie3D',
        'Ext.chart.interactions.RotatePie3D',
        'kalix.task.assignmentcharts.store.AssignmentPieChartStore',
        'kalix.task.assignmentcharts.controller.AssignmentPieChartController'
    ],
    controller: {
        type: 'assignmentPieChartController'
    },
    items: [
        {
            xtype: 'polar',
            reference: 'chart',
            innerPadding: 40,
            width: 700,
            height: 500,
            store: {
                type: 'assignmentPieChartStore'
            },
            theme: 'Muted',
            interactions: ['itemhighlight', 'rotatePie3d'],
            legend: {
                type: 'sprite',
                docked: 'bottom'
            },
            series: [
                {
                    type: 'pie3d',
                    angleField: 'percent',
                    donut: 30,
                    distortion: 0.6,
                    highlight: {
                        margin: 40
                    },
                    label: {
                        field: 'orgName'
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: 'onSeriesTooltipRender'
                    }
                }
            ]
        }
    ]
});