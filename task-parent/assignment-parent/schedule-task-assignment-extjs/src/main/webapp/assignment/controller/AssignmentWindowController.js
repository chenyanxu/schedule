/**
 * 布置任务表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.controller.AssignmentWindowController', {
    extend: 'kalix.controller.BaseWindowController',
    alias: 'controller.assignmentWindowController',
    onSave: function(){
        var viewModel = this.getViewModel();
        var model = viewModel.get('rec');
        if(model.get('sourceType') != 2){
            Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, "来源于不能为空");
            return;
        }
        this.callParent(arguments);
    },
    onAccept: function () {
        var viewModel = this.getViewModel();
        var view = this.getView();
        var model = viewModel.get('rec');
        var store = viewModel.get('store');

        store.proxy.extraParams = {};
        // 设置任务状态为进行中
        model.set('state',2);
        model.modified = model.data;
        store.sync(
            {
                callback: function (batch) {
                    store.currentPage = 1;
                    store.load();
                    view.close();
                    var res = Ext.JSON.decode(batch.operations[0].getResponse().responseText);

                    if (batch.operations[0].success) {
                        kalix.Notify.success(res.msg, CONFIG.ALTER_TITLE_SUCCESS);
                    }
                    else {
                        Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, res.msg);
                    }
                }
            }
        );
    },
    onReject: function (grid, rowIndex, colIndex) {
        var viewModel = this.getViewModel();
        var view = this.getView();
        var model = viewModel.get('rec');
        var store = viewModel.get('store');
        Ext.Msg.confirm("警告", "确定要拒绝本任务吗？", function (button) {
            if (button == "yes") {
                store.proxy.extraParams = {};
                // 设置任务状态为拒绝
                model.set('state', 1);
                model.modified = model.data;
                store.sync(
                    {
                        callback: function (batch) {
                            store.currentPage = 1;
                            store.load();
                            view.close();
                            var res = Ext.JSON.decode(batch.operations[0].getResponse().responseText);

                            if (batch.operations[0].success) {
                                kalix.Notify.success(res.msg, CONFIG.ALTER_TITLE_SUCCESS);
                            }
                            else {
                                Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, res.msg);
                            }
                        }
                    }
                );
            }
        });
    }
});
