/**
 * 已读用户列表表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.ReadingGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.task.assignment.store.ReadingStore'
    ],
    alias: 'widget.readingGrid',
    xtype: 'readingGridPanel',
    controller: {
        type: 'baseGridController',
        cfgForm: '',
        cfgViewForm: '',
        cfgModel: 'kalix.task.assignment.model.ReadingModel'
    },
    store: {
        type: 'readingStore'
    },

    //todo 在此修改grid显示列
    columns: {
        defaults: {flex: 1, renderer: 'addTooltip'},
        items: [
            {
                xtype: "rownumberer",
                text: "行号",
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
                text: '名字',
                dataIndex: 'participantId'
            },
            {
                text: '是否已读',
                trueText: '已读',
                falseText: '未读',
                xtype: 'booleancolumn',
                dataIndex: 'participantId',
                renderer: null
            },
            {
                text: '日期',
                dataIndex: 'updateDate',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                renderer: null
            }
        ]
    }
});
