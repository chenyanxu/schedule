Ext.define('kalix.task.assignmentcharts.controller.AssignmentChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assignmentChartController',
    colors: [
        '#8ca640',
        '#974144',
        '#4091ba',
        '#8e658e',
        '#3b8d8b',
        '#b86465',
        '#d2af69',
        '#6e8852',
        '#3dcc7e',
        '#a6bed1',
        '#cbaa4b',
        '#998baa'
    ],

    getRandomColor:function(){
        //颜色字符串
        var colorStr="";
        //字符串的每一字符的范围
        var randomArr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        //产生一个六位的字符串
        for(var i=0;i<6;i++){
            //15是范围上限，0是范围下限，两个函数保证产生出来的随机数是整数
            colorStr+=randomArr[Math.ceil(Math.random()*(15-0)+0)];
        }
        return '#' + colorStr;
    },

    onColumnRender: function (sprite, config, data, index) {
        return {
            //fillStyle: this.colors[index],
            fillStyle: this.getRandomColor(),
            strokeStyle: index % 2 ? 'none' : 'black',
            opacity: index % 2 ? 1 : 0.5
        };
    },
    onSeriesLabelRender: function (v) {
        //return Ext.util.Format.number(v / 1000, '0,000');
        return v;
    },

    onTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('orgName') + ': ' + record.get('total'));
    },

    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except adding a thousands separator, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return Ext.util.Format.number(layoutContext.renderer(label), '');
    },
    onItemClick: function (view, record, item, index, e) {
        var searchForm = this.getView().items.getAt(1).items.getAt(0);
        var beginDateGt = searchForm.items.getAt(0).rawValue;
        var beginDateLt = searchForm.items.getAt(2).rawValue;
        var endDateGt = searchForm.items.getAt(3).rawValue;
        var endDateLt = searchForm.items.getAt(5).rawValue;

        var statistics = this.getView().items.getAt(1).items.getAt(1);
        var columnChart = this.getView().items.getAt(1).items.getAt(2).items.getAt(0).lookupReference('chart');
        var pieChart = this.getView().items.getAt(1).items.getAt(2).items.getAt(1).lookupReference('chart');
        var jsonStr = {
            'orgCode':record.data.code,
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

    onLoad: function(nodes){
        var searchForm = this.getView().items.getAt(1).items.getAt(0);
        var orgCode = searchForm.items.getAt(6);
        if (nodes.data.length > 0) {
            orgCode.setValue(nodes.data.items[0].data.code);
            var jsonStr = {
                'orgCode': nodes.data.items[0].data.code
            };

            var statistics = this.getView().items.getAt(1).items.getAt(1);
            var columnChart = this.getView().items.getAt(1).items.getAt(2).items.getAt(0).lookupReference('chart');
            var pieChart = this.getView().items.getAt(1).items.getAt(2).items.getAt(1).lookupReference('chart');

            jsonStr = Ext.JSON.encode(jsonStr);
            statistics.store.proxy.extraParams = {'jsonStr':jsonStr};
            statistics.store.reload();
            columnChart.store.proxy.extraParams = {'jsonStr':jsonStr};
            columnChart.store.reload();
            pieChart.store.proxy.extraParams = {'jsonStr':jsonStr};
            pieChart.store.reload();
        }
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('orgName') + ': ' + record.get('percent') + '%');
    }
});