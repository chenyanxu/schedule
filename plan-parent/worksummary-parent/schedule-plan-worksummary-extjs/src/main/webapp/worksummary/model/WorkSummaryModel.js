/**
 * 工作总结模型
 *
 * @author
 * @version 1.0.0
 */


Ext.define('kalix.plan.worksummary.model.WorkSummaryModel', {
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
            name: 'workType',
            type: 'int',
            defaultValue: 0,
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
