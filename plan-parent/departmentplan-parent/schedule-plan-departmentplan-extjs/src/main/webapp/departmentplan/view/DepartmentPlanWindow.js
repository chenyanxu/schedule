/**
 * 部门计划新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.view.DepartmentPlanWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
		'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    alias: 'widget.departmentplanWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "departmentplanWindow",
    width: 400,
    //todo 在此修改表单
    items: [
        {
            xtype: 'baseForm',
            items: [
                	{
                		fieldLabel: '用户ID',
                		allowBlank: false,
						hidden: true,
                		bind: {
                			value: '{rec.userId}'
                		}
                	},
                	{
                		fieldLabel: '用户姓名',
                		allowBlank: false,
						hidden: true,
                		bind: {
                			value: '{rec.userName}'
                		}
                	},
                	{
                		fieldLabel: '部门ID',
                		allowBlank: false,
						hidden: true,
                		bind: {
                			value: '{rec.departmentId}'
                		}
                	},
                	{
                		fieldLabel: '部门名称',
                		allowBlank: false,
						hidden: true,
                		bind: {
                			value: '{rec.departmentName}'
                		}
                	},
                	{
                		fieldLabel: '计划标题',
                		allowBlank: false,
                		bind: {
                			value: '{rec.title}'
                		}
                	},
                	{
                		fieldLabel: '计划内容',
                		allowBlank: false,
						xtype: 'textarea',
                		bind: {
                			value: '{rec.content}'
                		}
                	},
                	{
                		fieldLabel: '计划类型',
						xtype: 'scheduleDictCombobox',
						dictType: '计划类型',
                		allowBlank: false,
                		bind: {
                			value: '{rec.planType}'
                		}
                	},
                	{
                		fieldLabel: '计划开始时间',
                		allowBlank: false,
                		xtype: 'datefield',
                		format: 'Y-m-d',
                		bind: {
                			value: '{rec.beginDate}'
                		}
                	},
                	{
                		fieldLabel: '计划结束时间',
                		allowBlank: false,
						xtype: 'datefield',
						format: 'Y-m-d',
                		bind: {
                			value: '{rec.endDate}'
                		}
                	},
                	{
                		fieldLabel: '计划状态',
						xtype: 'scheduleDictCombobox',
						dictType: '计划状态',
                		allowBlank: false,
                		bind: {
                			value: '{rec.state}'
                		}
                	}
            ]
        }
    ]
});