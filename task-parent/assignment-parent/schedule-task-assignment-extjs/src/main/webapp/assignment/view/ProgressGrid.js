/**
 * 进度表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.ProgressGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.task.assignment.store.ProgressStore'
    ],
    alias: 'widget.progressGrid',
    xtype: 'progressGridPanel',
    controller: {
        type: 'baseGridController',
        cfgForm: '',
        cfgViewForm: '',
        cfgModel: 'kalix.task.assignment.model.ProgressModel'
    },
    store: {
        type: 'progressStore'
    },

    //todo 在此修改grid显示列
    columns: {
        defaults: {flex: 1, renderer: 'addTooltip'},
        items: [
            {
                xtype: 'rownumberer',
                text: '行号',
                width: 50,
                flex: 0,
                align: 'center',
                renderer: this.update
            },
            {
                text: '编号',
                dataIndex: 'id',
                hidden: true
            },
            {
                text: '任务ID',
                dataIndex: 'assignmentId',
                hidden: true
            },
            {
                text: '任务进度(%)',
                dataIndex: 'percent',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'progressbarwidget',
                    textTpl: [
                        '{percent}% 完成'
                    ]
                },
                renderer: null
            },
            {
                text: '进度说明',
                dataIndex: 'comment'
            }
        ]
    }
});
