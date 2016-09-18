/**
 * 工作汇报表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.workreport.view.WorkReportGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.plan.workreport.controller.WorkReportGridController',
        'kalix.plan.workreport.store.WorkReportStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn'
    ],
    alias: 'widget.workreportGrid',
    xtype: 'workreportGridPanel',
    controller: {
        type: 'workreportGridController',
        cfgForm: 'kalix.plan.workreport.view.WorkReportWindow',
        cfgViewForm: 'kalix.plan.workreport.view.WorkReportViewWindow',
        cfgModel: 'kalix.plan.workreport.model.WorkReportModel'
    },
    store: {
        type: 'workreportStore'
    },

    //todo 在此修改grid显示列
    columns: [
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
            hidden: true,
            dataIndex: 'userId'
        },
        {
            text: '用户名',
            hidden: true,
            dataIndex: 'userName'
        },
        {
            text: '部门id',
            dataIndex: 'orgId',
            hidden: true
        },
        {
            text: '部门code',
            hidden: true,
            dataIndex: 'orgCode'
        },
        {
            text: '部门名称',
            dataIndex: 'orgName'
        },
        {
            text: '标题',
            dataIndex: 'title'
        },
        {
            text: '内容',
            dataIndex: 'content',
            hidden: true
        },
        {
            text: '汇报类型',
            xtype: 'scheduleDictGridColumn',
            dictType: '汇报类型',
            dataIndex: 'workType', renderer: null
        },
        {
            text: '开始日期',
            dataIndex: 'beginDate',
            xtype: 'datecolumn',
            format: 'Y-m-d', renderer: null
        },
        {
            text: '结束日期',
            dataIndex: 'endDate',
            xtype: 'datecolumn',
            format: 'Y-m-d', renderer: null
        },
        {
            text: '创建日期',
            dataIndex: 'creationDate'
        },
        {
            text: '最近更新',
            dataIndex: 'updateDate'
        },
        {
            xtype: 'securityGridColumnCommon',
            flex: 0,
            width: 150,
            verifyItems: [
                {
                    iconCls: "iconfont icon-view-column",
                    permission: 'view',
                    tooltip: '查看',
                    handler: 'onView'
                },
                {
                    //bind: {icon: ''},
                    iconCls: "iconfont icon-edit-column",
                    permission: 'edit',
                    tooltip: '编辑',
                    handler: 'onEdit'
                },
                {
                    iconCls: "iconfont icon-delete",
                    permission: 'delete',
                    tooltip: '删除',
                    handler: 'onDelete'
                },
                {
                    iconCls: 'iconfont icon-attachment-column',
                    permission: 'attachement',
                    tooltip: '附件管理',
                    handler: 'onAttachmentManage'
                }
            ]
        }
    ],
    tbar: {
        xtype: 'securityToolbar',
        verifyItems: [
            {
                text: '添加',
                xtype: 'button',
                iconCls: 'iconfont icon-add',
                permission: 'add',
                handler: 'onAdd'
            }
        ]
    }
});
