/**
 * 布置任务模型
 *
 * @author
 * @version 1.0.0
 */


Ext.define('kalix.task.assignment.model.EventModel', {
    extend: 'kalix.model.BaseModel',

    //todo 在此修改模型定义
    fields: [
        {
            name: 'assignmentId',
            type: 'int'
        },
        {
            name: 'eventType',
            type: 'int'
        },
        {
            name: 'eventContent'
        },
        {
            name: 'operator',
            type: 'int'
        },
        {
            name: 'operatorName'
        }
    ]
});
