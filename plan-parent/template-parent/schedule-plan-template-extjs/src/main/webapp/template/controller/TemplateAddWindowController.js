/**
 * 布置任务表格控制器
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.controller.TemplateAddWindowController', {
    extend: 'kalix.controller.BaseWindowController',
    alias: 'controller.templateAddWindowController',
    onSave: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        var model = viewModel.get('rec');
        var departmentplanId = model.get('departmentplanId');
        var templateName = model.get('templateName');
        var extraParams = {'departmentplanId':departmentplanId,'templateName':templateName};
        Ext.Ajax.request({
            url:CONFIG.restRoot + '/camel/rest/templates/departmentplan/new',
            params: Ext.JSON.encode(extraParams),
            async: false,
            method: 'POST',
            defaultPostHeader:'application/json; charset=UTF-8',
            callback: function (options, success, response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success) {
                    kalix.Notify.success(resp.msg, CONFIG.ALTER_TITLE_SUCCESS);
                    //var store = grid.getStore();
                    //store.reload();
                    view.close();
                }
                else{
                    Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, resp.msg);
                }
            }
        });
    }
});
