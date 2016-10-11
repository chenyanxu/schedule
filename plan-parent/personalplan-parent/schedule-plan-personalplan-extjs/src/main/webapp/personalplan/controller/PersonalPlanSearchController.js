/**
 * Created by Administrator on 2016/8/16.
 */
Ext.define('kalix.plan.personalplan.controller.PersonalPlanSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personalplansearchController',
    onItemClick: function (view, record, item, index, e) {
        var searchForm = this.getView().items.getAt(1).items.getAt(0);
        var orgCode = searchForm.items.getAt(0);
        orgCode.originalValue = record.data.code;
        orgCode.setValue(record.data.code);

        var grid = this.getView().items.getAt(1).items.getAt(1);
        if (grid.canLoad) {
            grid.store.reload();
        }
    },
    onLoad: function (nodes) {
        var searchForm = this.getView().items.getAt(1).items.getAt(0);
        var orgCode = searchForm.items.getAt(0);
        if (nodes.data.length > 0) {
            var node = nodes.data.items[0];
            orgCode.originalValue = node.data.code;
            orgCode.setValue(node.data.code);

            var tree = this.getView().items.getAt(0).items.getAt(1);
            var root = tree.store;
            var nodeExpand = root.getNodeById(node.data.id);

            var grid = this.getView().items.getAt(1).items.getAt(1);
            grid.store.reload();

            // 阻止选择默认值时，触发
            grid.canLoad = false;
            tree.setSelection(nodeExpand);
            grid.canLoad = true;
        }
    }
});