/**
 * 工作汇报表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.workreport.controller.WorkReportGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.workreportGridController',
    mixins: {
        attachment: 'kalix.attachment.common.mixins.Attachment'
    }
});
