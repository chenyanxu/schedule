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
    /**
     * 打开添加操作.
     */
    onAdd: function (target) {
        var scope = this;
        Ext.Msg.confirm("警告", "是否从模板新建任务？", function (button) {
            if (button == "yes") {
                var view = Ext.create('kalix.task.assignment.view.TemplateWindow');
                var vm = view.lookupViewModel();
                vm.set('rec', Ext.create('kalix.task.assignment.model.TemplateModel'));
                vm.set('iconCls', vm.get('editIconCls'));
                vm.set('title','从模板添加任务');
                vm.set('store',this.getView().store);
                view.show();
            }else{
                var view = Ext.create(this.cfgForm);
                var vm = view.lookupViewModel();

                vm.set('rec', Ext.create(this.cfgModel));
                vm.set('iconCls', vm.get('addIconCls'));
                vm.set('title', vm.get('addTitle'));
                vm.set('store',this.getView().store);

                this.viewModelExtraInit(vm);
                view.show();
            }
        },scope);
    },
    //任务取消
    onCancel: function (grid, rowIndex, colIndex) {
        var model = grid.getStore().getData().items[rowIndex];
        var store = grid.getStore();

        Ext.Msg.confirm("警告", "确定撤销本任务吗？", function (button) {
            if (button == "yes") {
                store.proxy.extraParams = {};
                // 设置任务状态为取消
                model.set('state',6);
                model.set('eventType',6);
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
    //任务失败
    onFailure: function (grid, rowIndex, colIndex) {
        var model = grid.getStore().getData().items[rowIndex];
        var store = grid.getStore();

        Ext.Msg.confirm("警告", "确定使本任务失败吗？", function (button) {
            if (button == "yes") {
                store.proxy.extraParams = {};
                // 设置任务状态为失败
                model.set('state',5);
                model.set('eventType',5);
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
    //修改负责人
    onHeader: function (grid, rowIndex, colIndex) {
        var selModel = grid.getStore().getData().items[rowIndex];
        //状态为拒绝接受时，修改负责人后，状态是否可改为等待接收
        //if(selModel.data.state == 1){
        //    selModel.data.state = '0';
        //}
        var view = Ext.create('kalix.task.assignment.view.HeaderWindow');
        var vm = view.lookupViewModel();
        selModel.set('eventType',8);
        selModel.dirty = false;
        vm.set('rec', selModel);
        vm.set('iconCls', vm.get('editIconCls'));
        vm.set('title','修改负责人');
        vm.set('store',this.getView().store);

        view.show();
        grid.setSelection(selModel);
    },
    //汇报进度
    onProgress: function (grid, rowIndex, colIndex) {
        var selModel = grid.getStore().getData().items[rowIndex];
        var view = Ext.create('kalix.task.assignment.view.ProgressWindow');
        var vm = view.lookupViewModel();
        selModel.set('eventType',9);
        selModel.set('comment','');
        selModel.dirty = false;
        vm.set('rec', selModel);
        vm.set('iconCls', 'iconfont icon-schedule-task-progress');
        vm.set('title','汇报进度');
        vm.set('store',this.getView().store);

        view.show();
        grid.setSelection(selModel);
    },
    //任务督办，暂无此需求
    onSupervise: function (grid, rowIndex, colIndex) {
        var model = grid.getStore().getData().items[rowIndex];
        var store = grid.getStore();

        Ext.Msg.confirm("警告", "确定督办本任务吗？", function (button) {
            if (button == "yes") {
                store.proxy.extraParams = {};
                // 设置任务事件类型为督办
                model.set('eventType',11);
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
    //任务延迟
    onDelay: function (grid, rowIndex, colIndex) {
        var scope = this;
        Ext.Msg.confirm("警告", "确定延长本任务的完成时间吗？", function (button) {
            if (button == "yes") {
                var selModel = grid.getStore().getData().items[rowIndex];
                var view = Ext.create('kalix.task.assignment.view.DelayWindow');
                var vm = view.lookupViewModel();
                selModel.set('eventType',7);
                vm.set('rec', selModel);
                vm.set('iconCls', vm.get('editIconCls'));
                vm.set('title',vm.get('editTitle'));
                vm.set('store',scope.getView().store);

                view.show();
                grid.setSelection(selModel);
            }
        });
    },
    //申请任务完成
    onComplete: function (grid, rowIndex, colIndex) {
        var model = grid.getStore().getData().items[rowIndex];
        var store = grid.getStore();
        Ext.Msg.confirm("警告", "确定要申请完成本任务吗？", function (button) {
            if (button == "yes") {
                store.proxy.extraParams = {};
                // 设置任务状态为申请完成
                model.set('state',3);
                model.set('eventType',3);
                //需求说申请的同时，将进度
                model.set('percent',1);
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
    //审批任务完成
    onFinish: function (grid, rowIndex, colIndex) {
        var selModel = grid.getStore().getData().items[rowIndex];
        // 设置任务状态为完成
        //selModel.data.state = '6';
        var view = Ext.create('kalix.task.assignment.view.CompleteWindow');
        var vm = view.lookupViewModel();

        vm.set('rec', selModel);
        vm.set('iconCls', vm.get('editIconCls'));
        vm.set('title','审批任务完成');
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
