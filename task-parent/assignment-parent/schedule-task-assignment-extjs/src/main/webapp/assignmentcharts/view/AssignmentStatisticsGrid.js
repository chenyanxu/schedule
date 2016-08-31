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
    height: 450,
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
            text: '任务总数',
            dataIndex: 'total'
        },
        {
            text: '等待接收',
            dataIndex: 'waiting'
        },
        {
            text: '拒绝接受',
            dataIndex: 'reject'
        },
        {
            text: '进行中',
            dataIndex: 'process'
        }, {
            text: '提交审核',
            dataIndex: 'complete'
        },
        {
            text: '已完成',
            dataIndex: 'finish'
        },
        {
            text: '已失败',
            dataIndex: 'failure'
        },
        {
            text: '已取消',
            dataIndex: 'cancel'
        }
    ]
});
