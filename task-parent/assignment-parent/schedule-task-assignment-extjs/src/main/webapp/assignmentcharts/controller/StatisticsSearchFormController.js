Ext.define('kalix.task.assignmentcharts.controller.StatisticsSearchFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.statisticsSearchFormController',
    onSearch: function (target, event) {
        var mainPanel = Ext.app.Application.instance.getApplication()._mainView.controller.getReferences().mainCardPanel.items.getAt(0);
        var searchForm = mainPanel.items.getAt(1).items.getAt(0);
        var beginDateGt = searchForm.items.getAt(0).rawValue;
        var beginDateLt = searchForm.items.getAt(2).rawValue;
        var endDateGt = searchForm.items.getAt(3).rawValue;
        var endDateLt = searchForm.items.getAt(5).rawValue;
        var orgCode = searchForm.items.getAt(6).rawValue;

        var selectTree = mainPanel.controller.getReferences().userorgtreelist.getSelection();
        if(selectTree.length==1){
            orgCode = selectTree[0].data.code;
        }
        var statistics = mainPanel.items.getAt(1).items.getAt(1);
        var columnChart = mainPanel.items.getAt(1).items.getAt(2).items.getAt(0).lookupReference('chart');
        var pieChart = mainPanel.items.getAt(1).items.getAt(2).items.getAt(1).lookupReference('chart');
        var jsonStr = {
            'orgCode':orgCode,
            'beginDate:begin:gt':beginDateGt,
            'beginDate:end:lt':beginDateLt,
            'endDate:begin:gt':endDateGt,
            'endDate:end:lt':endDateLt
        };

        jsonStr = Ext.JSON.encode(jsonStr);
        statistics.store.proxy.extraParams = {'jsonStr':jsonStr};
        statistics.store.reload();
        columnChart.store.proxy.extraParams = {'jsonStr':jsonStr};
        columnChart.store.reload();
        pieChart.store.proxy.extraParams = {'jsonStr':jsonStr};
        pieChart.store.reload();
    },
    onReset: function () {
        var mainPanel = Ext.app.Application.instance.getApplication()._mainView.controller.getReferences().mainCardPanel.items.getAt(0);
        var searchForm = mainPanel.items.getAt(1).items.getAt(0);
        var code = searchForm.items.getAt(6).rawValue;
        this.getView().getForm().reset();
        searchForm.items.getAt(6).setValue(code);
    }
});