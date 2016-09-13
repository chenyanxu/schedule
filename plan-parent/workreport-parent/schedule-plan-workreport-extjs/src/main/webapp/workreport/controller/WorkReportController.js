/**
 * 工作汇报表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.workreport.controller.WorkReportController', {
    extend: 'kalix.controller.BaseWindowController',
    alias: 'controller.workReportController',
    requires: ['kalix.Notify'],
    onSave: function() {
        var planType = Ext.getCmp('workReportPlanType');
        if (planType.getValue() == '1' || planType.getValue() == '2') {
            var plan = Ext.getCmp('workReportPlanComboBox');
            if (plan.getValue() == null || plan.getValue() == '') {
                kalix.Notify.error('请选择关联的计划！！！', CONFIG.ALTER_TITLE_ERROR);
                return;
            }
        }

        this.callParent(arguments);
    }
});
