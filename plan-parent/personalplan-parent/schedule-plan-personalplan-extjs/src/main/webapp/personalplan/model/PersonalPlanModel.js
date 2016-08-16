/**
 * 个人计划模型
 *
 * @author
 * @version 1.0.0
 */


Ext.define('kalix.plan.personalplan.model.PersonalPlanModel', {
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
            type: 'string',
            validators: [{type: 'presence'}]
        },
        {
            name: 'orgName',
            type: 'string',
            validators: [{type: 'presence'}]
        },
        {
            name: 'title',
            type: 'string',
            validators: [{type: 'presence'}]
        },
        {
            name: 'content',
            type: 'string',
            validators: [{type: 'presence'}]
        },
        {
            name: 'planType',
            type: 'string',
            validators: [{type: 'presence'}]
        },
        {
            name: 'state',
            type: 'string',
            validators: [{type: 'presence'}]
        },
        {
            name: 'beginDate',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s',
            validators: [{type: 'presence'}]
        },
        {
            name: 'endDate',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s',
            validators: [{type: 'presence'}]
        }
    ]
});
