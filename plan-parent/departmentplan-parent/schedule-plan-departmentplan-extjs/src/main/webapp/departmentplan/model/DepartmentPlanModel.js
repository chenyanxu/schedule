/**
 * 部门计划模型
 *
 * @author
 * @version 1.0.0
 */


Ext.define('kalix.plan.departmentplan.model.DepartmentPlanModel', {
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
        	name: 'departmentId',
        	type: 'int',
        	defaultValue: 0
        	},
        	{
        	name: 'departmentName',
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
        	type: 'string'
        	},
        	{
        	name: 'beginDate',
        	type: 'date',
        	dateFormat: 'Y-m-d H:i:s'	},
        	{
        	name: 'endDate',
        	type: 'string'
        	}
    ]
});
