/**
 * 工作总结表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.worksummary.controller.WorkSummaryGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.worksummaryGridController',
    mixins: {
        attachment: 'kalix.attachment.common.mixins.Attachment'
    }
});
