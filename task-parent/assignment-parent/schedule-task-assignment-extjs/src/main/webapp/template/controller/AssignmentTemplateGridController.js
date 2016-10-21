/**
 * 任务模板表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.controller.AssignmentTemplateGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.assignmentTemplateGridController',
    //onAdd: function (target) {
    //    Ext.JSON.decode(this.getView().store.proxy.extraParams.jsonStr).planTemplateId;
    //
    //    var view = Ext.create(this.cfgForm);
    //    var vm = view.lookupViewModel();
    //
    //    vm.set('rec', Ext.create(this.cfgModel));
    //    vm.set('iconCls', vm.get('addIconCls'));
    //    vm.set('title', vm.get('addTitle'));
    //    vm.set('store',this.getView().store);
    //
    //    this.viewModelExtraInit(vm);
    //
    //    view.show();
    //},
    viewModelExtraInit:function(vm){
        //If have extra init,overwrite this method
        var view = this.getView();
        var planTemplateId = Ext.JSON.decode(view.store.proxy.extraParams.jsonStr).planTemplateId;

        vm.get('rec').set('planTemplateId',planTemplateId);
    }
});
