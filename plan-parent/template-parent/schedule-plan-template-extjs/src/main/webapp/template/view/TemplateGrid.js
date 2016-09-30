/**
 * 任务模板表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.view.TemplateGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.schedule.template.controller.TemplateGridController',
        'kalix.schedule.template.store.TemplateStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn'
    ],
    alias: 'widget.templateGrid',
    xtype: 'templateGridPanel',
    controller: {
        type: 'templateGridController',
        cfgForm: 'kalix.schedule.template.view.TemplateWindow',
        cfgViewForm: 'kalix.schedule.template.view.TemplateViewWindow',
        cfgModel: 'kalix.schedule.template.model.TemplateModel'
    },
    store: {
        type: 'templateStore'
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
                text: '模板名称',
                dataIndex: 'templateName'
            },
            {
                text: '计划标题',
                dataIndex: 'title'
            },
            {
                text: '计划类型',
                xtype: 'scheduleDictGridColumn',
                dictType: '部门计划类型',
                dataIndex: 'planType',
                renderer: null
            },
            {
                xtype: 'securityGridColumnCommon',
                //todo change permission
                items: [
                    {
                        iconCls: "iconfont icon-view-column",
                        permission: 'view',
                        tooltip: '查看',
                        handler: 'onView'
                    },
                    {
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
