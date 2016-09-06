/**
 * 布置任务表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignmentcharts.view.AssignmentStatisticsGrid', {
    extend: 'kalix.task.assignmentcharts.view.StatisticsBaseGrid',
    requires: [
        'kalix.task.assignmentcharts.store.AssignmentStatisticsStore'
    ],
    alias: 'widget.assignmentStatisticsGrid',
    xtype: 'assignmentStatisticsGridPanel',
    store: {
        type: 'assignmentStatisticsStore'
    },
    stripeRows: true,
    //todo 在此修改grid显示列
    defaults: {flex: 1, renderer: null},
    height: 400,
    columns: [
        {
            xtype: "rownumberer"
        },
        {
            text: '编号',
            dataIndex: 'id',
            hidden: true
        },
        {
            text: '组织结构名称',
            dataIndex: 'orgName',
            flex: 2
        },
        {
            text: '所有任务',
            dataIndex: 'total'
        },
        {
            text: '任务完成数',
            dataIndex: 'finish'
        },
        {
            text: '等待接收数',
            dataIndex: 'waiting'
        },
        {
            text: '进行中的任务',
            dataIndex: 'process'
        },
        {
            text: '进行中的超期数',
            dataIndex: 'processDelay'
        },
        {
            text: '完成已超期数',
            dataIndex: 'finishDelay'
        },
        {
            text: '撤销数',
            dataIndex: 'cancel'
        },
        {
            text: '拒绝接受数',
            dataIndex: 'reject'
        },
        {
            text: '提交审核数',
            dataIndex: 'complete'
        },
        {
            text: '已失败数',
            dataIndex: 'failure'
        }
    ]
});
