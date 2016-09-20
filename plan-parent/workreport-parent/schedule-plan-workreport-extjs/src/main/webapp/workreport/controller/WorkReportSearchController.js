/**
 * Created by Administrator on 2016/8/16.
 */
Ext.define('kalix.plan.workreport.controller.WorkReportSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workreportsearchController',
    onItemClick: function (view, record, item, index, e) {
        var searchForm = this.getView().items.getAt(1).items.getAt(0);
        var orgCode = searchForm.items.getAt(2);
        orgCode.setValue(record.data.code);
        var grid = this.getView().items.getAt(1).items.getAt(1);
        grid.store.reload();
    },
    onLoad: function(nodes){
        var searchForm = this.getView().items.getAt(1).items.getAt(0);
        var orgCode = searchForm.items.getAt(2);
        if (nodes.data.length > 0) {
            var node = nodes.data.items[0];
            orgCode.setValue(node.data.code);

            var tree = this.getView().items.getAt(0).items.getAt(1);
            var root = tree.store;
            var nodeExpand = root.getNodeById(node.data.id);

            tree.setSelection(nodeExpand)


            var grid = this.getView().items.getAt(1).items.getAt(1);
            grid.store.reload();
        }
    }
});