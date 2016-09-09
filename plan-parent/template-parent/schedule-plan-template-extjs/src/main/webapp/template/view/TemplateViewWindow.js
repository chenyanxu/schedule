/**
 * 任务模板查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.schedule.template.view.TemplateViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    alias: 'widget.templateViewWindow',
    xtype: "templateViewWindow",
    width: 400,
    //todo 在此修改查看字段
    items: [
        {
            defaults: {readOnly: true},
            xtype: 'baseForm',
            items: [
                	{
                		fieldLabel: '用户ID',
                		allowBlank: false,
                		bind: {
                			value: '{rec.userId}'
                		}
                	},
                	{
                		fieldLabel: '用户姓名',
                		allowBlank: false,
                		bind: {
                			value: '{rec.userName}'
                		}
                	},
                	{
                		fieldLabel: '组织机构ID',
                		allowBlank: false,
                		bind: {
                			value: '{rec.orgId}'
                		}
                	},
                	{
                		fieldLabel: '组织机构编码',
                		allowBlank: false,
                		bind: {
                			value: '{rec.orgCode}'
                		}
                	},
                	{
                		fieldLabel: '组织机构名称',
                		allowBlank: false,
                		bind: {
                			value: '{rec.orgName}'
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
                		bind: {
                			value: '{rec.content}'
                		}
                	},
                	{
                		fieldLabel: '计划类型',
                		allowBlank: false,
                		xtype: 'numberfield',
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
                		allowBlank: false,
                		xtype: 'numberfield',
                		bind: {
                			value: '{rec.state}'
                		}
                	},
                	{
                		fieldLabel: '任务ID',
                		allowBlank: false,
                		bind: {
                			value: '{rec.taskIds}'
                		}
                	}
            ]
        }
    ]
});