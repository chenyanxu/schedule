/**
 * 布置任务表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.controller.DepartmentPlanWindowController', {
    extend: 'kalix.controller.BaseWindowController',
    alias: 'controller.departmentPlanWindowController',
    onSave: function () {
        var viewModel = this.getViewModel();
        var model = viewModel.get('rec');
        if (model.get('beginDate') > model.get('endDate')) {
            Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, '结束日期不能小于开始日期');
            return;
        }

        this.callParent(arguments);
    }
});
