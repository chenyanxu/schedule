/**
 * 个人计划表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.workreport.view.WorkReportViewGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.plan.workreport.controller.WorkReportGridController',
        'kalix.plan.workreport.store.WorkReportStore'
    ],
    alias: 'widget.workreportviewGrid',
    xtype: 'workreportviewGridPanel',
    //==custom property
    autoLoad: false,
    config: {
        planId: '0'
    },
    //custom property==
    store: {
        type: 'workreportStore',
        proxyUrl: ''
    },
    listeners:{
        'render': function() {
            this.store.proxy.url = CONFIG.restRoot + '/camel/rest/personalplans/' + this.getPlanId() + '/workreport';
            this.store.load();
        }
    },
    controller: {
        type: 'workreportGridController',
        cfgForm: 'kalix.plan.workreport.view.WorkReportWindow',
        cfgViewForm: 'kalix.plan.workreport.view.WorkReportViewWindow',
        cfgModel: 'kalix.plan.workreport.model.WorkReportModel'
    },
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: '标题',
            dataIndex: 'title'
        },
        {
            text: '开始日期',
            dataIndex: 'beginDate',
            xtype: 'datecolumn',
            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd', renderer: null
        },
        {
            text: '结束日期',
            dataIndex: 'endDate',
            xtype: 'datecolumn',
            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd', renderer: null
        },
        {
            xtype: 'securityGridColumnCommon',
            items: [
                {
                    iconCls: 'iconfont icon-view-column',
                    permission: '',
                    tooltip: '查看',
                    handler: 'onView'
                },
                {
                    iconCls: 'iconfont icon-attachment-column',
                    permission: '',
                    tooltip: '附件管理',
                    handler: 'onAttachmentManage'
                }
            ]
        }
    ]
});
