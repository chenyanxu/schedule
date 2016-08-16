/**
 * Created by Administrator on 2016/8/16.
 */
Ext.define('kalix.plan.personalplan.controller.PersonalPlanSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personalplansearchController',
    onItemClick: function (view, record, item, index, e) {
        var searchForm = this.getView().items.getAt(1).items.getAt(0);
        var orgCode = searchForm.items.getAt(2);
        orgCode.setValue(record.data.code);
        var grid = this.getView().items.getAt(1).items.getAt(1);
        grid.store.reload();
    }
});