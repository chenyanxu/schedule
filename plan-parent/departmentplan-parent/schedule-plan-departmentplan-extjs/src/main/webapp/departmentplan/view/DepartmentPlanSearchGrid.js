/**
 * 个人计划表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.view.DepartmentPlanSearchGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.plan.departmentplan.controller.DepartmentPlanGridController',
        'kalix.plan.departmentplan.store.DepartmentPlanStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn'
    ],
    alias: 'widget.departmentplansearchGrid',
    xtype: 'departmentplansearchGridPanel',
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
                dataIndex: 'userId',
                hidden: true
            },
            {
                text: '用户名',
                dataIndex: 'userName'
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
                        iconCls: 'iconfont icon-attachment-column',
                        permission: '',
                        tooltip: '附件管理',
                        handler: 'onAttachmentManage'
                    }
                ]
            }
        ]
    }
});
