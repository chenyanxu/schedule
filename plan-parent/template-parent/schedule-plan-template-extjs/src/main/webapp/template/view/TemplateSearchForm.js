/**
 * 任务模板查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.view.TemplateSearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    alias: 'widget.templateSearchForm',
    xtype: 'templateSearchForm',
    storeId: 'templateStore',
    items: [
        	{
        		xtype: 'textfield',
        		fieldLabel: '用户ID',
        		labelAlign: 'right',
        		labelWidth: 60,
        		width: 200,
        		name: 'userId'
        	},
        	{
        		xtype: 'textfield',
        		fieldLabel: '用户姓名',
        		labelAlign: 'right',
        		labelWidth: 60,
        		width: 200,
        		name: 'userName'
        	},
        	{
        		xtype: 'textfield',
        		fieldLabel: '组织机构ID',
        		labelAlign: 'right',
        		labelWidth: 60,
        		width: 200,
        		name: 'orgId'
        	},
        	{
        		xtype: 'textfield',
        		fieldLabel: '组织机构编码',
        		labelAlign: 'right',
        		labelWidth: 60,
        		width: 200,
        		name: 'orgCode'
        	},
        	{
        		xtype: 'textfield',
        		fieldLabel: '组织机构名称',
        		labelAlign: 'right',
        		labelWidth: 60,
        		width: 200,
        		name: 'orgName'
        	},
        	{
        		xtype: 'textfield',
        		fieldLabel: '计划标题',
        		labelAlign: 'right',
        		labelWidth: 60,
        		width: 200,
        		name: 'title'
        	},
        	{
        		xtype: 'textfield',
        		fieldLabel: '计划内容',
        		labelAlign: 'right',
        		labelWidth: 60,
        		width: 200,
        		name: 'content'
        	},
        	{
        		xtype: 'numberfield',
        		fieldLabel: '计划类型',
        		labelAlign: 'right',
        		labelWidth: 60,
        		width: 200,
        		name: 'planType'
        	},
        	{
        		xtype: 'datefield',
        		format: 'Y-m-d',
        		fieldLabel: '计划开始时间:',
        		labelAlign: 'right',
        		labelWidth: 120,
        		width: 260,
        		name: 'beginDate:begin:gt'
        	},
        	{
        		xtype: 'displayfield',
        		hideLabel: true,
        		value: '-',
        		margin:'0 5 0 5'
        	},
        	{
        		xtype: 'datefield',
        		format: 'Y-m-d',
        		headLabel: true,
        		labelAlign: 'right',
        		width: 140,
        		name: 'beginDate:end:lt'
        	},
        	{
        		xtype: 'datefield',
        		format: 'Y-m-d',
        		fieldLabel: '计划结束时间:',
        		labelAlign: 'right',
        		labelWidth: 120,
        		width: 260,
        		name: 'endDate:begin:gt'
        	},
        	{
        		xtype: 'displayfield',
        		hideLabel: true,
        		value: '-',
        		margin:'0 5 0 5'
        	},
        	{
        		xtype: 'datefield',
        		format: 'Y-m-d',
        		headLabel: true,
        		labelAlign: 'right',
        		width: 140,
        		name: 'endDate:end:lt'
        	},
        	{
        		xtype: 'numberfield',
        		fieldLabel: '计划状态',
        		labelAlign: 'right',
        		labelWidth: 60,
        		width: 200,
        		name: 'state'
        	},
        	{
        		xtype: 'textfield',
        		fieldLabel: '任务ID',
        		labelAlign: 'right',
        		labelWidth: 60,
        		width: 200,
        		name: 'taskIds'
        	}
    ]
});
