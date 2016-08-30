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
            if(model.get('sourceId') == null || model.get("sourceId") == "") {
                Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, "来源于不能为空");
                return;
            }
        }else{
            model.set('sourceId',0);
        }
        if(model.get('beginDate') > model.get('endDate')){
            Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, "结束日期不能小于开始日期");
            return;
        }
        if(model.get('workHours') == 0){
            Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, "评估工时不能为0");
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
