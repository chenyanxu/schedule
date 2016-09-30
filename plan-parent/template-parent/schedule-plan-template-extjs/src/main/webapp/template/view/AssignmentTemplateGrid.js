/**
 * 任务模板表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.view.AssignmentTemplateGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.schedule.template.controller.AssignmentTemplateGridController',
        'kalix.schedule.template.store.AssignmentTemplateStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn'
    ],
    alias: 'widget.assignmentTemplateGrid',
    xtype: 'assignmentTemplateGridPanel',
    plugins: ['zorderPlugin'],
    autoLoad:false,
    controller: {
        type: 'assignmentTemplateGridController',
        cfgForm: 'kalix.schedule.template.view.AssignmentTemplateWindow',
        cfgViewForm: 'kalix.schedule.template.view.AssignmentTemplateViewWindow',
        cfgModel: 'kalix.schedule.template.model.AssignmentTemplateModel'
    },
    store: {
        type: 'assignmentTemplateStore'
    },

    //todo 在此修改grid显示列
    columns: {
        defaults: {flex: 1, renderer: 'addTooltip'},
        items: [
            {
                xtype: 'rownumberer',
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
                text: '计划模板ID',
                dataIndex: 'planTemplateId',
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
                dataIndex: 'title'
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
                text: '任务来源',
                xtype: 'scheduleDictGridColumn',
                dictType: '任务来源',
                dataIndex: 'sourceType',
                hidden: true
            },
            {
                text: '来源于',
                dataIndex: 'sourcePlanId',
                hidden: true
            },
            {
                text: '来源于',
                dataIndex: 'sourceTaskId',
                hidden: true
            },
            {
                header: '常规操作',
                xtype: 'securityGridColumnCommon',
                //todo change permission
                items: [
                    {
                        tooltip: '查看',
                        permission: 'view',
                        iconCls: "iconfont icon-view-column",
                        handler: 'onView'
                    },
                    {
                        tooltip: '编辑',
                        permission: 'edit',
                        handler: 'onEdit',
                        iconCls: 'iconfont icon-edit-column'
                    },
                    {
                        tooltip: '删除',
                        permission: 'delete',
                        handler: 'onDelete',
                        iconCls: 'iconfont icon-delete'
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
                permission: 'add',
                handler: 'onAdd'
            }
        ]
    }
});
