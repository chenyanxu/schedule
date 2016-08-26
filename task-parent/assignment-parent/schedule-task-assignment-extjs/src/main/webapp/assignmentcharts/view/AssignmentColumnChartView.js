/**
 * The Basic 3D Column Chart displays a set of random data in a column series.
 * The "Download" button will trigger the download of the chart's image or
 * show the preview of the chart, if triggering the download is not permitted
 * on the target platform.
 *
 * Tapping or hovering a column will highlight it.
 */
Ext.define('kalix.task.assignmentcharts.view.AssignmentColumnChartView', {
    extend: 'Ext.Panel',
    alias: 'widget.AssignmentColumnChartView',
    xtype: 'assignmentColumnChartView',
    requires: [
        'Ext.chart.theme.Muted',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Numeric3D',
        'Ext.chart.series.Bar3D',
        'Ext.chart.axis.Category3D',
        'Ext.chart.grid.HorizontalGrid3D',
        'Ext.chart.grid.VerticalGrid3D',
        'Ext.chart.interactions.ItemHighlight',
        'kalix.task.assignmentcharts.store.AssignmentColumnChartStore',
        'kalix.task.assignmentcharts.controller.AssignmentColumnChartController'
    ],
    controller: {
        type: 'assignmentColumnChartController'
    },

    //width: 650,
    //height: 900,
    //
    //tbar: [
    //    '->',
    //    {
    //        text: Ext.os.is.Desktop ? 'Download' : 'Preview',
    //        handler: 'onDownload'
    //    }
    //],

    items: [
        //{
        //    xtype:'button',
        //    text: '重新加载',
        //    handler:'onDownload'
        //},
        {
            xtype: 'cartesian',
            reference: 'chart',
            theme: {
                type: 'muted'
            },
            store: {
                type: 'assignmentColumnChartStore'
            },
            //width: 600,
            height: 900,
            insetPadding: '40 40 40 20',
            animation: Ext.isIE8 ? false : {
                easing: 'backOut',
                duration: 500
            },
            axes: [
                {
                    type: 'numeric3d',
                    position: 'left',
                    fields: 'total',
                    //maximum: 40,
                    majorTickSteps: 10,
                    label: {
                        textAlign: 'right'
                    },
                    renderer: 'onAxisLabelRender',
                    title: '任务数',
                    grid: {
                        odd: {
                            fillStyle: 'rgba(255, 255, 255, 0.06)'
                        },
                        even: {
                            fillStyle: 'rgba(0, 0, 0, 0.03)'
                        }
                    }
                },
                {
                    type: 'category3d',
                    position: 'bottom',
                    fields: 'orgName',
                    grid: true
                }
            ],
            series: [
                {
                    type: 'bar3d',
                    xField: 'orgName',
                    yField: 'total',
                    style: {
                        minGapWidth: 20
                    },
                    highlightCfg: {
                        saturationFactor: 1.5
                    },
                    label: {
                        field: 'total',
                        display: 'insideEnd',
                        renderer: 'onSeriesLabelRender'
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: 'onTooltipRender'
                    },
                    renderer: 'onColumnRender'
                }
            ],
            sprites: [
                {
                    type: 'text',
                    text: '按组织机构统计任务数',
                    fontSize: 22,
                    width: 100,
                    height: 30,
                    x: 40, // the sprite x position
                    y: 20  // the sprite y position
                }
                //    , {
                //    type: 'text',
                //    text: 'Source: http://en.wikipedia.org/wiki/List_of_countries_by_GDP_sector_composition',
                //    fontSize: 10,
                //    x: 12,
                //    y: 490
                //}
            ]
        }
    ]
});