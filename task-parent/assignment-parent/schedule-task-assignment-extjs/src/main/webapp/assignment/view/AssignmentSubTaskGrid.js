/**
 * 布置任务表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.AssignmentSubTaskGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.task.assignment.controller.AssignmentGridController',
        'kalix.task.assignment.store.AssignmentStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn'
    ],
    alias: 'widget.assignmentSubTaskGrid',
    xtype: 'assignmentSubTaskGridPanel',
    controller: {
        type: 'assignmentGridController',
        cfgForm: 'kalix.task.assignment.view.AssignmentWindow',
        cfgViewForm: 'kalix.task.assignment.view.AssignmentSubTaskViewWindow',
        cfgModel: 'kalix.task.assignment.model.AssignmentModel'
    },
    store: {
        type: 'assignmentStore'
    },

    //todo 在此修改grid显示列
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: '编号',
            dataIndex: 'id',
            hidden: true
        },
        {
            text: '用户id',
            dataIndex: 'userId',
            hidden: true
        },
        {
            text: '用户名称',
            dataIndex: 'userName',
            hidden: true
        },
        {
            text: '部门id',
            dataIndex: 'orgId',
            hidden: true
        },
        {
            text: '部门代码',
            dataIndex: 'orgCode',
            hidden: true
        },
        {
            text: '部门名称',
            dataIndex: 'orgName',
            hidden: true
        },
        {
            text: '任务名称',
            xtype: 'templatecolumn',
            tpl: new Ext.XTemplate('<tpl>{title}</tpl>'),
            renderer: null
        },
        {
            text: '任务状态',
            xtype: 'scheduleDictGridColumn',
            dictType: '任务状态',
            dataIndex: 'state',
            renderer: null
        },
        {
            text: '布置人',
            dataIndex: 'createBy'
        },
        {
            text: '负责人',
            dataIndex: 'header'
        },
        {
            text: '开始日期',
            dataIndex: 'beginDate',
            xtype: 'datecolumn',
            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
            renderer: null
        },
        {
            text: '结束日期',
            dataIndex: 'endDate',
            xtype: 'datecolumn',
            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
            renderer: null
        },
        {
            header: '操作',
            xtype: 'securityGridColumnCommon',
            //todo change permission
            verifyItems: [
                {
                    tooltip: '查看',
                    permission: 'view',
                    iconCls: 'iconfont icon-view-column',
                    handler: 'onView'
                }
            ]
        }
    ]
});
