/**
 * 部门计划表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.view.DepartmentPlanGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.plan.departmentplan.controller.DepartmentPlanGridController',
        'kalix.plan.departmentplan.store.DepartmentPlanStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn'
    ],
    alias: 'widget.departmentplanGrid',
    xtype: 'departmentplanGridPanel',
    controller: {
        type: 'departmentplanGridController',
        cfgForm: 'kalix.plan.departmentplan.view.DepartmentPlanWindow',
        cfgViewForm: 'kalix.plan.departmentplan.view.DepartmentPlanViewWindow',
        cfgModel: 'kalix.plan.departmentplan.model.DepartmentPlanModel'
    },
    store: {
        type: 'departmentplanStore'
    },

    //todo 在此修改grid显示列
    columns: [
        {
            xtype: "rownumberer",
        },
        {
            text: '编号',
            dataIndex: 'id',
            hidden: true
        },
        {
            text: '用户ID',
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
            text: '部门code',
            dataIndex: 'orgCode',
            hidden: true
        },
        {
            text: '部门名',
            dataIndex: 'orgName'
        },
        {
            text: '计划标题',
            dataIndex: 'title'
        },
        {
            text: '计划开始时间',
            dataIndex: 'beginDate',
            xtype: 'datecolumn',
            format: 'Y-m-d', renderer: null
        },
        {
            text: '计划结束时间',
            dataIndex: 'endDate',
            xtype: 'datecolumn',
            format: 'Y-m-d', renderer: null
        },
        {
            text: '计划状态',
            xtype: 'scheduleDictGridColumn',
            dictType: '计划状态',
            dataIndex: 'state', renderer: null
        },
        {
            text: '最近更新',
            dataIndex: 'updateDate',
            xtype: 'datecolumn',
            format: 'Y-m-d', renderer: null
        },
        {
            text: '计划类型',
            xtype: 'scheduleDictGridColumn',
            dictType: '计划类型',
            dataIndex: 'planType', renderer: null
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
