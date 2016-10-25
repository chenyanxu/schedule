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
    /**
     * 打开添加操作.
     */
    onAdd: function (target) {
        var scope = this;
        Ext.Msg.confirm("警告", "是否从模板新建计划？", function (button) {
            if (button == "yes") {
                var view = Ext.create('kalix.task.assignment.view.TemplateWindow');
                var vm = view.lookupViewModel();
                vm.set('rec', Ext.create('kalix.task.assignment.model.TemplateModel'));
                vm.set('iconCls', vm.get('editIconCls'));
                vm.set('title','从模板添加计划');
                vm.set('store',this.getView().store);
                view.show();
            }else{
                var view = Ext.create(this.cfgForm);
                var vm = view.lookupViewModel();

                vm.set('rec', Ext.create(this.cfgModel));
                vm.set('iconCls', vm.get('addIconCls'));
                vm.set('title', vm.get('addTitle'));
                vm.set('store',this.getView().store);

                this.viewModelExtraInit(vm);
                view.show();
            }
        },scope);
    },
    onTemplate: function (grid, rowIndex, colIndex) {
        var selModel = grid.getStore().getData().items[rowIndex];
        var newModel = Ext.create('kalix.schedule.template.model.TemplateModel');
        var view = Ext.create('kalix.schedule.template.view.TemplateAddWindow');
        newModel.set('templateName', '');
        newModel.set('departmentplanId', selModel.id);
        newModel.dirty = false;
        var vm = view.lookupViewModel();
        vm.set('rec', newModel);
        vm.set('iconCls', vm.get('editIconCls'));
        vm.set('title', '新增模板');

        view.show();
    }
});
