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
            xtype: 'rownumberer'
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
            dictType: '部门计划类型',
            dataIndex: 'planType', renderer: null
        },
        {
            text: '计划状态',
            xtype: 'scheduleDictGridColumn',
            dictType: '部门计划状态',
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
                    permission: 'edit',
                    tooltip: '编辑',
                    handler: 'onEdit',
                    getClass: function (v, meta, record) {
                        if (record.data.state == 2) {
                            return "kalix_hidden";
                        }else{
                            return 'iconfont icon-edit-column';
                        }
                    }
                },
                {
                    permission: 'delete',
                    tooltip: '删除',
                    handler: 'onDelete',
                    getClass: function (v, meta, record) {
                        if (record.data.state == 2) {
                            return "kalix_hidden";
                        }else{
                            return 'iconfont icon-delete';
                        }
                    }
                },
                {
                    permission: 'attachement',
                    tooltip: '附件管理',
                    handler: 'onAttachmentManage',
                    getClass: function (v, meta, record) {
                        if (record.data.state == 2) {
                            return "kalix_hidden";
                        }else{
                            return 'iconfont icon-attachment-column';
                        }
                    }
                },
                {
                    permission: 'template',
                    tooltip: '存为模板',
                    handler: 'onTemplate',
                    getClass: function (v, meta, record) {
                        if (record.data.state == 2) {
                            return "kalix_hidden";
                        }else{
                            return 'iconfont icon-schedule-plantemplate';
                        }
                    }
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
