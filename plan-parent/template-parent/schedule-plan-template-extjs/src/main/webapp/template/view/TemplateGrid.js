/**
 * 任务模板表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.view.TemplateGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.schedule.template.controller.TemplateGridController',
        'kalix.schedule.template.store.TemplateStore'
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
        defaults: {flex: 1,renderer: 'addTooltip'},
        items: [
            {
                xtype: "rownumberer",
                text: "行号",
                width: 50,
                flex: 0,
                align: 'center',
                renderer:this.update
            },
            {
                text: '编号',
                dataIndex: 'id',
                hidden: true
            },
            	{
            		text: '用户ID',
            		dataIndex: 'userId'
            	},
            	{
            		text: '用户姓名',
            		dataIndex: 'userName'
            	},
            	{
            		text: '组织机构ID',
            		dataIndex: 'orgId'
            	},
            	{
            		text: '组织机构编码',
            		dataIndex: 'orgCode'
            	},
            	{
            		text: '组织机构名称',
            		dataIndex: 'orgName'
            	},
            	{
            		text: '计划标题',
            		dataIndex: 'title'
            	},
            	{
            		text: '计划内容',
            		dataIndex: 'content'
            	},
            	{
            		text: '计划类型',
            		dataIndex: 'planType'
            	},
            	{
            		text: '计划开始时间',
            		dataIndex: 'beginDate',
            		xtype: 'datecolumn',
            		format: 'Y-m-d',		renderer:null
            	},
            	{
            		text: '计划结束时间',
            		dataIndex: 'endDate',
            		xtype: 'datecolumn',
            		format: 'Y-m-d',		renderer:null
            	},
            	{
            		text: '计划状态',
            		dataIndex: 'state'
            	},
            	{
            		text: '任务ID',
            		dataIndex: 'taskIds'
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
                iconCls:'iconfont icon-add',
                permission: '',
                handler: 'onAdd'
            }
        ]
    }
});
