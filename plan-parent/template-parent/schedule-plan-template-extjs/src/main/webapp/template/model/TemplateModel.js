/**
 * 任务模板模型
 *
 * @author
 * @version 1.0.0
 */


Ext.define('kalix.schedule.template.model.TemplateModel', {
    extend: 'kalix.model.BaseModel',

    //todo 在此修改模型定义
    fields: [
        	{
        	name: 'userId',
        	type: 'int',
        	defaultValue: 0
        	},
        	{
        	name: 'userName',
        	type: 'string'
        	},
        	{
        	name: 'orgId',
        	type: 'int',
        	defaultValue: 0
        	},
        	{
        	name: 'orgCode',
        	type: 'string'
        	},
        	{
        	name: 'orgName',
        	type: 'string'
        	},
        	{
        	name: 'title',
        	type: 'string'
        	},
        	{
        	name: 'content',
        	type: 'string'
        	},
        	{
        	name: 'planType',
        	type: 'int',
        	defaultValue: 0
        	},
        	{
        	name: 'beginDate',
        	type: 'date',
        	dateFormat: 'Y-m-d H:i:s'	},
        	{
        	name: 'endDate',
        	type: 'date',
        	dateFormat: 'Y-m-d H:i:s'	},
        	{
        	name: 'state',
        	type: 'int',
        	defaultValue: 0
        	},
        	{
        	name: 'taskIds',
        	type: 'string'
        	}
    ]
});
