/**
 * 个人计划表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.personalplan.view.PersonalPlanGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.plan.personalplan.controller.PersonalPlanGridController',
        'kalix.plan.personalplan.store.PersonalPlanStore'
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
            		text: '用户id',
            		dataIndex: 'userId',
                    hidden: true
            	},
            	{
            		text: '用户名',
            		dataIndex: 'userName'
            	},
            	{
            		text: '部门id',
            		dataIndex: 'departmentId',
                    hidden: true
            	},
            	{
            		text: '部门名',
            		dataIndex: 'departmentName',
                    hidden: true
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
            		dataIndex: 'planType'
            	},
            	{
            		text: '计划状态',
            		dataIndex: 'state'
            	},
            	{
            		text: '开始日期',
            		dataIndex: 'beginDate',
            		xtype: 'datecolumn',
            		format: 'Y-m-d',		renderer:null
            	},
            	{
            		text: '结束日期',
            		dataIndex: 'endDate',
            		xtype: 'datecolumn',
            		format: 'Y-m-d',		renderer:null
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
