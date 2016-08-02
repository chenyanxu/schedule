/**
 * 部门计划表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.view.DepartmentPlanGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.plan.departmentplan.controller.DepartmentPlanGridController',
        'kalix.plan.departmentplan.store.DepartmentPlanStore'
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
            		text: '性别',
            		dataIndex: 'departmentId'
            	},
            	{
            		text: '用户姓名',
            		dataIndex: 'departmentName'
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
            		dataIndex: 'endDate'
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
