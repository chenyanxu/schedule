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
            name: 'templateName',
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
            name: 'departmentplanId'
        },
        {
            name: 'title'
        },
        {
            name: 'content'
        },
        {
            name: 'planType'
        },
        {
            name: 'planDate'
        },
        {
            name: 'state'
        },
        {
            name: 'taskIds'
        }
    ]
});
