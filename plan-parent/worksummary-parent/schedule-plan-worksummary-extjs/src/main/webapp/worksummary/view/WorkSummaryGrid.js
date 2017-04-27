/**
 * 工作总结表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.worksummary.view.WorkSummaryGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.plan.worksummary.controller.WorkSummaryGridController',
        'kalix.plan.worksummary.store.WorkSummaryStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn'
    ],
    alias: 'widget.worksummaryGrid',
    xtype: 'worksummaryGridPanel',
    controller: {
        type: 'worksummaryGridController',
        cfgForm: 'kalix.plan.worksummary.view.WorkSummaryWindow',
        cfgViewForm: 'kalix.plan.worksummary.view.WorkSummaryViewWindow',
        cfgModel: 'kalix.plan.worksummary.model.WorkSummaryModel'
    },
    store: {
        type: 'worksummaryStore'
    },

    //todo 在此修改grid显示列
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: '编号',
            dataIndex: 'id',
            hidden: true,
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
            dataIndex: 'orgId',
            hidden: true
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
            text: '总结类型',
            xtype: 'scheduleDictGridColumn',
            dictType: '总结类型',
            dataIndex: 'workType', renderer: null
        },
        {
            text: '开始日期',
            dataIndex: 'beginDate',
            xtype: 'datecolumn',
            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd', renderer: null
        },
        {
            text: '结束日期',
            dataIndex: 'endDate',
            xtype: 'datecolumn',
            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd', renderer: null
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
                    iconCls: 'iconfont icon-view-column',
                    permission: 'view',
                    tooltip: '查看',
                    handler: 'onView'
                },
                {
                    //bind: {icon: ''},
                    iconCls: 'iconfont icon-edit-column',
                    permission: 'edit',
                    tooltip: '编辑',
                    handler: 'onEdit'
                },
                {
                    iconCls: 'iconfont icon-delete',
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
