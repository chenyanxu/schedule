/**
 * 任务模板模型
 *
 * @author
 * @version 1.0.0
 */


Ext.define('kalix.schedule.template.model.AssignmentTemplateModel', {
    extend: 'kalix.model.BaseModel',

    //todo 在此修改模型定义
    fields: [
        {
            name: 'planTemplateId',
            validators: [{type: 'presence'}]
        },
        {
            name: 'userId'
        },
        {
            name: 'userName'
        },
        {
            name: 'orgId'
        },
        {
            name: 'orgCode'
        },
        {
            name: 'orgName'
        },
        {
            name: 'title'
        },
        {
            name: 'sourceType'
        },
        {
            name: 'sourceId'
        },
        {
            name: 'content'
        },
        {
            name: 'state'
        },
        {
            name: 'taskDate'
        },
        {
            name: 'workHours'
        },
        {
            name: 'head'
        },
        {
            name: 'header'
        },
        {
            name: 'participant'
        },
        {
            name: 'rewardStandard'
        },
        {
            name: 'instruction'
        }
    ]
});
