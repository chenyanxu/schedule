/**
 * 部门计划表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.controller.DepartmentPlanGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.departmentplanGridController',
    mixins: {
        attachment: 'kalix.attachment.common.mixins.Attachment'
    },
    onSaveTemplate: function (grid, rowIndex, colIndex) {
        Ext.Msg.alert(CONFIG.ALTER_TITLE_INFO,'TEST');
    }
});
