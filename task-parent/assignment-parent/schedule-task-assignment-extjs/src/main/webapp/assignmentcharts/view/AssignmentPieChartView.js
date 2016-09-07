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
    margin:'0 0 0 5',
    items: [
        {
            xtype: 'polar',
            reference: 'chart',
            innerPadding: 40,
            width: (Ext.Element.getViewportWidth() - 250 - 400 - 30)/2,
            height: ((Ext.Element.getViewportHeight() - 66 - 100 - 400 - 45 - 30) < 300) ? 300 : (Ext.Element.getViewportHeight() - 66 - 100 - 400 - 45 - 30),
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