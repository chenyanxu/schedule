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
        Ext.Msg.confirm("警告", "确定要将该部门计划设为模板吗？", function (button) {
            if (button == "yes") {
                var selModel = grid.getStore().getData().items[rowIndex];
                var newModel = Ext.create('kalix.schedule.template.model.TemplateModel');
                var view = Ext.create('kalix.schedule.template.view.TemplateWindow');
                newModel.set('templateName', '');
                newModel.set('departmentplanId', selModel.id);
                newModel.dirty = false;
                var vm = view.lookupViewModel();
                vm.set('rec', newModel);
                vm.set('iconCls', vm.get('editIconCls'));
                vm.set('title', '新增模板');
                vm.set('store', Ext.create('kalix.schedule.template.store.TemplateStore'));
                view.show();
            }
        });
    }
});
