/**
 * 布置任务模型
 *
 * @author
 * @version 1.0.0
 */


Ext.define('kalix.task.assignment.model.AssignmentModel', {
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
            defaultValue: 0,
            validators: [{type: 'presence'}]
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
            type: 'string',
            validators: [{type: 'presence'}]
        },
        {
            name: 'sourceType',
            type: 'string',
            validators: [{type: 'presence'}]
        },
        {
            name: 'sourceId',
            type: 'string'
        },
        {
            name: 'content',
            type: 'string',
            validators: [{type: 'presence'}]
        },
        {
            name: 'state',
            type: 'int',
            defaultValue: 0
        },
        {
            name: 'beginDate',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s',
            minValue: new Date(),
            validators: [{type: 'presence'}]
        },
        {
            name: 'endDate',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s',
            minValue: new Date(),
            validators: [{type: 'presence'}]
        },
        {
            name: 'workHours',
            type: 'float',
            validators: [{type: 'presence'}]
        },
        {
            name: 'head',
            type: 'int',
            validators: [{type: 'presence'}]
        },
        {
            name: 'header',
            type: 'string'
        },
        {
            name: 'participant',
            type: 'string',
            validators: [{type: 'presence'}]
        },
        {
            name: 'rewardStandard',
            type: 'string'
        },
        {
            name: 'instruction',
            type: 'string'
        },
        {
            name: 'percent',
            type: 'float'
        },
        {
            name: 'comment',
            type: 'string'
        },
        {
            name: 'score',
            type: 'int'
        },
        {
            name: 'advice',
            type: 'string'
        }
    ]
});
