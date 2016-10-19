/**
 * Created by Administrator on 2016/8/16.
 */
Ext.define('kalix.schedule.template.controller.TemplateMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.templateMainController',
    onItemClick: function (view, record, item, index, e) {

        var tmpGrid = this.getView().items.getAt(1).items.getAt(0);
        tmpGrid.store.proxy.extraParams = {'jsonStr':Ext.JSON.encode({planTemplateId:record.data.id})};
        tmpGrid.store.reload();
    }
});