/**
 * 个人计划表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.personalplan.view.PersonalPlanGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.plan.personalplan.controller.PersonalPlanGridController',
        'kalix.plan.personalplan.store.PersonalPlanStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn'
    ],
    alias: 'widget.personalplanGrid',
    xtype: 'personalplanGridPanel',
    controller: {
        type: 'personalplanGridController',
        cfgForm: 'kalix.plan.personalplan.view.PersonalPlanWindow',
        cfgViewForm: 'kalix.plan.personalplan.view.PersonalPlanViewWindow',
        cfgModel: 'kalix.plan.personalplan.model.PersonalPlanModel'
    },
    store: {
        type: 'personalplanStore'
    },

    //todo 在此修改grid显示列
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
            text: '部门code',
            dataIndex: 'orgCode',
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
            text: '计划类型',
            xtype: 'scheduleDictGridColumn',
            dictType: '计划类型',
            dataIndex: 'planType', renderer: null
        },
        {
            text: '计划状态',
            xtype: 'scheduleDictGridColumn',
            dictType: '计划状态',
            dataIndex: 'state', renderer: null
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
            text: '最近更新',
            dataIndex: 'updateDate',
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
    ],
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
