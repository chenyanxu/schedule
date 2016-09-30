/**
 * 任务模板表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.controller.TemplateGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.templateGridController',
    onTaskTemplate: function(grid, rowIndex, colIndex){
        var view = Ext.create('kalix.schedule.template.view.AssignmentTemplateMain');
        var viewModel = view.lookupViewModel();
        var selModel = grid.getStore().getData().items[rowIndex];
        //viewModel.set('planTemplateId', selModel.get('id'));
        //var assignmentTemplateSearchForm = view.items.items[0];
        //assignmentTemplateSearchForm.items.items[0].setValue(123);
        view.show();

        var tmpGrid = view.items.getAt(0);
        tmpGrid.store.proxy.extraParams = {'jsonStr':Ext.JSON.encode({planTemplateId:selModel.get('id')})};
        tmpGrid.store.reload();
    }
});
