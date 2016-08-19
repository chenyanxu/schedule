/**
 * 布置任务表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.controller.AssignmentGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.assignmentGridController',
    mixins: {
        attachment: 'kalix.attachment.common.mixins.Attachment'
    },
    onCancel: function (grid, rowIndex, colIndex) {
        var model = grid.getStore().getData().items[rowIndex];
        var store = grid.getStore();

        Ext.Msg.confirm("警告", "确定撤销本任务吗？", function (button) {
            if (button == "yes") {
                store.proxy.extraParams = {};
                // 设置任务状态为取消
                model.set('state',6);
                model.modified = model.data;
                store.sync(
                    {
                        callback: function (batch) {
                            store.currentPage = 1;
                            store.load();

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
    },
    onFailure: function (grid, rowIndex, colIndex) {
        var model = grid.getStore().getData().items[rowIndex];
        var store = grid.getStore();

        Ext.Msg.confirm("警告", "确定使本任务失败吗？", function (button) {
            if (button == "yes") {
                store.proxy.extraParams = {};
                // 设置任务状态为失败
                model.set('state',5);
                model.modified = model.data;
                store.sync(
                    {
                        callback: function (batch) {
                            store.currentPage = 1;
                            store.load();

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
    },
    onHeader: function (grid, rowIndex, colIndex) {
        var selModel = grid.getStore().getData().items[rowIndex];
        //状态为拒绝接受时，修改负责人后，状态是否可改为等待接收
        if(selModel.data.state == 1){
            selModel.data.state = '0';
        }
        var view = Ext.create('kalix.task.assignment.view.HeaderWindow');
        var vm = view.lookupViewModel();

        vm.set('rec', selModel);
        vm.set('iconCls', vm.get('editIconCls'));
        vm.set('title','修改负责人');
        vm.set('store',this.getView().store);

        view.show();
        grid.setSelection(selModel);
    },
    onProgress: function (grid, rowIndex, colIndex) {
        var selModel = grid.getStore().getData().items[rowIndex];
        var view = Ext.create('kalix.task.assignment.view.ProgressWindow');
        var vm = view.lookupViewModel();

        vm.set('rec', selModel);
        vm.set('iconCls', vm.get('editIconCls'));
        vm.set('title','汇报进度');
        vm.set('store',this.getView().store);

        view.show();
        grid.setSelection(selModel);
    },
    onSupervise: function (grid, rowIndex, colIndex) {
        var model = grid.getStore().getData().items[rowIndex];
        var store = grid.getStore();

        Ext.Msg.confirm("警告", "确定督办本任务吗？", function (button) {
            if (button == "yes") {

            }
        });
    },
    onDelay: function (grid, rowIndex, colIndex) {
        var scope = this;
        Ext.Msg.confirm("警告", "确定延长本任务的完成时间吗？", function (button) {
            if (button == "yes") {
                var selModel = grid.getStore().getData().items[rowIndex];
                var view = Ext.create('kalix.task.assignment.view.DelayWindow');
                var vm = view.lookupViewModel();

                vm.set('rec', selModel);
                vm.set('iconCls', vm.get('editIconCls'));
                vm.set('title',vm.get('editTitle'));
                vm.set('store',scope.getView().store);

                view.show();
                grid.setSelection(selModel);
            }
        });
    },
    onComplete: function (grid, rowIndex, colIndex) {
        var model = grid.getStore().getData().items[rowIndex];
        var store = grid.getStore();
        Ext.Msg.confirm("警告", "确定要完成本任务吗？", function (button) {
            if (button == "yes") {
                store.proxy.extraParams = {};
                // 设置任务状态为完成
                model.set('state',4);
                model.modified = model.data;
                store.sync(
                    {
                        callback: function (batch) {
                            store.currentPage = 1;
                            store.load();

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
    },
    onFinish: function (grid, rowIndex, colIndex) {
        var selModel = grid.getStore().getData().items[rowIndex];
        // 设置任务状态为完成
        selModel.data.state = '7';
        var view = Ext.create('kalix.task.assignment.view.CompleteWindow');
        var vm = view.lookupViewModel();

        vm.set('rec', selModel);
        vm.set('iconCls', vm.get('editIconCls'));
        vm.set('title','任务完成');
        vm.set('store',this.getView().store);

        view.show();
        grid.setSelection(selModel);
    },
    viewModelExtraInit:function(vm){
        if(vm.data.rec.data.state == 0) {
            if (vm.data.rec.data.head == Ext.util.Cookies.get('currentUserId')){
                vm.set('accept', false);
            } else {
                vm.set('accept', true);
            }
        }else{
            vm.set('accept', true);
        }
    }
});
