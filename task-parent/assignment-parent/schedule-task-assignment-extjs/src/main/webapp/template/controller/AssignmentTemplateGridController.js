/**
 * 任务模板表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.controller.AssignmentTemplateGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.assignmentTemplateGridController',
    onAdd: function (target) {
        if(!this.getView().store.proxy.extraParams.jsonStr
        ||!Ext.JSON.decode(this.getView().store.proxy.extraParams.jsonStr)
        ||!Ext.JSON.decode(this.getView().store.proxy.extraParams.jsonStr).planTemplateId) {
            alert('请选择计划模板');
            return;
        }

        var view = Ext.create(this.cfgForm);
        var vm = view.lookupViewModel();

        vm.set('rec', Ext.create(this.cfgModel));
        vm.set('iconCls', vm.get('addIconCls'));
        vm.set('title', vm.get('addTitle'));
        vm.set('store',this.getView().store);

        var planTemplateId = Ext.JSON.decode(this.getView().store.proxy.extraParams.jsonStr).planTemplateId;
        vm.get('rec').set('planTemplateId',planTemplateId);
        vm.get('rec').dirty = false;

        this.viewModelExtraInit(vm);
        view.show();
    },
    viewModelExtraInit:function(vm){
        //If have extra init,overwrite this method
        //var view = this.getView();
        //var planTemplateId = Ext.JSON.decode(view.store.proxy.extraParams.jsonStr).planTemplateId;
        //vm.get('rec').set('planTemplateId',planTemplateId);
    }
});
