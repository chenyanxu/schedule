/**
 * 个人计划表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.personalplan.controller.PersonalPlanGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.personalplanGridController',
    mixins: {
        attachment: 'kalix.attachment.common.mixins.Attachment'
    }
});
