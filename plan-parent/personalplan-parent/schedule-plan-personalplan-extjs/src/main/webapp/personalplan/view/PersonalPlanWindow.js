/**
 * 个人计划新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.personalplan.view.PersonalPlanWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController'
    ],
    alias: 'widget.personalplanWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "personalplanWindow",
    width: 400,
    //todo 在此修改表单
    items: [
        {
            xtype: 'baseForm',
            items: [
                	{
                		fieldLabel: '用户id',
                		allowBlank: false,
						hidden: true,
						bind: {
                			value: '{rec.userId}'
                		}
                	},
                	{
                		fieldLabel: '用户名',
                		allowBlank: false,
						hidden: true,
						bind: {
                			value: '{rec.userName}'
                		}
                	},
                	{
                		fieldLabel: '部门id',
                		allowBlank: false,
						hidden: true,
						bind: {
                			value: '{rec.departmentId}'
                		}
                	},
                	{
                		fieldLabel: '部门名',
                		allowBlank: false,
						hidden: true,
						bind: {
                			value: '{rec.departmentName}'
                		}
                	},
                	{
                		fieldLabel: '标题',
                		allowBlank: false,
                		bind: {
                			value: '{rec.title}'
                		}
                	},
                	{
                		fieldLabel: '内容',
                		allowBlank: false,
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
						fieldLabel: '计划状态',
						xtype: 'scheduleDictCombobox',
						dictType: '计划状态',
						allowBlank: false,
						bind: {
							value: '{rec.state}'
						}
                	},
                	{
                		fieldLabel: '开始日期',
                		allowBlank: false,
                		xtype: 'datefield',
                		format: 'Y-m-d',
                		bind: {
                			value: '{rec.beginDate}'
                		}
                	},
                	{
                		fieldLabel: '结束日期',
                		allowBlank: false,
                		xtype: 'datefield',
                		format: 'Y-m-d',
                		bind: {
                			value: '{rec.endDate}'
                		}
                	}
            ]
        }
    ]
});