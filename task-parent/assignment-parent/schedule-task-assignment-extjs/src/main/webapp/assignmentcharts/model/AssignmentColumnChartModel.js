/**
 * 布置任务模型
 *
 * @author
 * @version 1.0.0
 */


Ext.define('kalix.task.assignmentcharts.model.AssignmentColumnChartModel', {
    extend: 'kalix.model.BaseModel',

    //todo 在此修改模型定义
    fields: [
        {
            name: 'total'
        },
        {
            name: 'waiting'
        },
        {
            name: 'reject'
        },
        {
            name: 'process'
        },
        {
            name: 'complete'
        },
        {
            name: 'finish'
        },
        {
            name: 'failure'
        },
        {
            name: 'cancel'
        }
    ]
});
