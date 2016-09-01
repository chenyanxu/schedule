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
    //bodyPadding: 10,
    //margin: 10,
    //layout: 'vbox',
    //width: 650,
    //height: 500,
    //tbar: [
    //    '->',
    //    {
    //        xtype: 'segmentedbutton',
    //        defaults: {
    //            width: 100
    //        },
    //        items: [
    //            {
    //                text: 'Opaque',
    //                pressed: true
    //            },
    //            {
    //                text: 'Translucent'
    //            }
    //        ],
    //        listeners: {
    //            toggle: 'onStyleToggle'
    //        }
    //    },
    //    {
    //        text: 'Switch Theme',
    //        handler: 'onThemeSwitch'
    //    },
    //    {
    //        text: 'Preview',
    //        platformConfig: {
    //            desktop: {
    //                text: 'Download'
    //            }
    //        },
    //        handler: 'onDownload'
    //    }
    //],

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
        //,
        //{
        //    xtype: 'container',
        //    width: '100%',
        //    padding: 10,
        //    layout: {
        //        type: 'hbox',
        //        pack: 'center'
        //    },
        //    items: {
        //        xtype: 'form',
        //        defaults: {
        //            labelAlign: 'right',
        //            labelPad: 15,
        //            width: 400
        //        },
        //        items: [
        //            {
        //                xtype: 'sliderfield',
        //                fieldLabel: 'Thickness',
        //                value: 35,
        //                minValue: 20,
        //                maxValue: 70,
        //                listeners: {
        //                    change: 'onThicknessChange',
        //                    dragstart: 'onSliderDragStart',
        //                    dragend: 'onSliderDragEnd'
        //                }
        //            },
        //            {
        //                xtype: 'sliderfield',
        //                fieldLabel: 'Distortion',
        //                value: 50,
        //                minValue: 35,
        //                maxValue: 65,
        //                listeners: {
        //                    change: 'onDistortionChange',
        //                    dragstart: 'onSliderDragStart',
        //                    dragend: 'onSliderDragEnd'
        //                }
        //            },
        //            {
        //                xtype: 'sliderfield',
        //                fieldLabel: 'Bevel',
        //                value: 5,
        //                maxValue: 15,
        //                listeners: {
        //                    change: 'onBevelChange',
        //                    dragstart: 'onSliderDragStart',
        //                    dragend: 'onSliderDragEnd'
        //                }
        //            },
        //            {
        //                xtype: 'sliderfield',
        //                fieldLabel: 'Donut',
        //                value: 30,
        //                maxValue: 50,
        //                listeners: {
        //                    change: 'onDonutChange',
        //                    dragstart: 'onSliderDragStart',
        //                    dragend: 'onSliderDragEnd'
        //                }
        //            },
        //            {
        //                xtype: 'sliderfield',
        //                fieldLabel: 'Color Spread',
        //                value: 1,
        //                maxValue: 2,
        //                increment: 0.05,
        //                decimalPrecision: 2,
        //                listeners: {
        //                    change: 'onColorSpreadChange',
        //                    dragstart: 'onSliderDragStart',
        //                    dragend: 'onSliderDragEnd'
        //                }
        //            }
        //        ]
        //    }
        //}
    ]
});