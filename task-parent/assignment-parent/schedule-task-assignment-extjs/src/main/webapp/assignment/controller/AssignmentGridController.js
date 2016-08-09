/**
 * 布置任务表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.controller.AssignmentGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.assignmentGridController',
    mixins: {
        attachment: 'kalix.attachment.common.mixins.Attachment'
    }
});
