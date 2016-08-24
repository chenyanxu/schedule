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
                text: '部门名',
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
