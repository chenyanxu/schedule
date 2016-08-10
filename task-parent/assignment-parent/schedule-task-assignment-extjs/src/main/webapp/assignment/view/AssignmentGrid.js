/**
 * 布置任务表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.AssignmentGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.task.assignment.controller.AssignmentGridController',
        'kalix.task.assignment.store.AssignmentStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn'
    ],
    alias: 'widget.assignmentGrid',
    xtype: 'assignmentGridPanel',
    controller: {
        type: 'assignmentGridController',
        cfgForm: 'kalix.task.assignment.view.AssignmentWindow',
        cfgViewForm: 'kalix.task.assignment.view.AssignmentViewWindow',
        cfgModel: 'kalix.task.assignment.model.AssignmentModel'
    },
    store: {
        type: 'assignmentStore'
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
                text: '用户id',
                dataIndex: 'userId',
                hidden: true
            },
            {
                text: '用户名',
                dataIndex: 'userName',
                hidden: true
            },
            {
                text: '部门id',
                dataIndex: 'departmentId',
                hidden: true
            },
            {
                text: '部门名称',
                dataIndex: 'departmentName',
                hidden: true
            },
            {
                text: '任务名称',
                dataIndex: 'title'
            },
            {
                text: '任务状态',
                xtype: 'scheduleDictGridColumn',
                dictType: '任务状态',
                dataIndex: 'state'
            },
            {
                text: '负责人',
                dataIndex: 'head'
            },
            {
                text: '布置人',
                dataIndex: 'createBy'
            },
            {
                text: '任务来源',
                xtype: 'scheduleDictGridColumn',
                dictType: '任务来源',
                dataIndex: 'sourceType',
                hidden: true
            },
            {
                text: '来源于',
                dataIndex: 'sourceId',
                hidden: true
            },
            {
                text: '开始日期',
                dataIndex: 'beginDate',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                renderer: null
            },
            {
                text: '结束日期',
                dataIndex: 'endDate',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                renderer: null
            },
            {
                xtype: 'securityGridColumnCommon',
                //todo change permission
                items: [
                    {
                        iconCls: "iconfont icon-view-column",
                        permission: '',
                        tooltip: '查看',
                        handler: 'onView'
                    },
                    {
                        //bind: {icon: ''},
                        iconCls: "iconfont icon-edit-column",
                        permission: '',
                        tooltip: '编辑',
                        handler: 'onEdit'
                    },
                    {
                        iconCls: "iconfont icon-delete",
                        permission: '',
                        tooltip: '删除',
                        handler: 'onDelete'
                    },
                    {
                        iconCls: 'iconfont icon-attachment-column',
                        permission: '',
                        tooltip: '附件管理',
                        handler: 'onAttachmentManage'
                    }
                ]
            }
        ]
    },
    tbar: {
        xtype: 'securityToolbar',
        verifyItems: [
            {
                text: '添加',
                xtype: 'button',
                iconCls: 'iconfont icon-add',
                permission: '',
                handler: 'onAdd'
            }
        ]
    }
});
