/**
 * 任务事件表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.EventGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.task.assignment.store.EventStore'
    ],
    alias: 'widget.eventGrid',
    xtype: 'eventGridPanel',
    controller: {
        type: 'baseGridController',
        cfgForm: '',
        cfgViewForm: '',
        cfgModel: 'kalix.task.assignment.model.EventModel'
    },
    store: {
        type: 'eventStore'
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
                text: '类型',
                dataIndex: 'eventType'
            },
            {
                text: '事件标题/内容',
                dataIndex: 'eventContent'
            },
            {
                text: '操作人',
                dataIndex: 'operator'
            },
            {
                text: '时间',
                dataIndex: 'creationDate',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                renderer: null
            }
        ]
    }
});
