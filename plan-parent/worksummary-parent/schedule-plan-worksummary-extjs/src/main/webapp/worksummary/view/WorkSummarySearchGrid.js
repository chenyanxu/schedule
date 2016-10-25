/**
 * 个人计划表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.worksummary.view.WorkSummarySearchGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.plan.worksummary.controller.WorkSummaryGridController',
        'kalix.plan.worksummary.store.WorkSummaryStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn',
        'kalix.view.components.common.IconColumn'
    ],
    alias: 'widget.worksummarysearchGrid',
    xtype: 'worksummarysearchGridPanel',
    controller: {
        type: 'worksummaryGridController',
        cfgForm: 'kalix.plan.worksummary.view.WorkSummaryWindow',
        cfgViewForm: 'kalix.plan.worksummary.view.WorkSummaryViewWindow',
        cfgModel: 'kalix.plan.worksummary.model.WorkSummaryModel'
    },
    store: {
        type: 'worksummaryStore',
        proxyUrl: CONFIG.restRoot + '/camel/rest/worksummarysearchs'
    },
    autoLoad: false,

    columns: [
        {
            xtype: 'rownumberer',
            text: "行号",
            width: 50,
            flex: 0,
            align: 'center',
            renderer: this.update
        },
        {
            text: '编号',
            dataIndex: 'id',
            hidden: true
        },
        {
            text: '用户id',
            hidden: true,
            dataIndex: 'userId'
        },
        {
            text: '部门id',
            dataIndex: 'orgId',
            hidden: true
        },
        {
            text: '头像',
            xtype: 'iconcolumn',
            dataIndex: 'userIcon'
        },
        {
            text: '部门名称',
            dataIndex: 'orgName'
        },
        {
            text: '用户名称',
            dataIndex: 'userName'
        },
        {
            text: '标题',
            dataIndex: 'title'
        },
        {
            text: '内容',
            dataIndex: 'content',
            hidden: true
        },
        {
            text: '总结类型',
            xtype: 'scheduleDictGridColumn',
            dictType: '总结类型',
            dataIndex: 'workType', renderer: null
        },
        {
            text: '开始日期',
            dataIndex: 'beginDate',
            xtype: 'datecolumn',
            format: 'Y-m-d', renderer: null
        },
        {
            text: '结束日期',
            dataIndex: 'endDate',
            xtype: 'datecolumn',
            format: 'Y-m-d', renderer: null
        },
        {
            text: '创建日期',
            dataIndex: 'creationDate'
        },
        {
            text: '最近更新',
            dataIndex: 'updateDate'
        },
        {
            xtype: 'securityGridColumnCommon',
            //todo change permission
            verifyItems: [
                {
                    iconCls: "iconfont icon-view-column",
                    permission: 'view',
                    tooltip: '查看',
                    handler: 'onView'
                },
                {
                    iconCls: 'iconfont icon-attachment-column',
                    permission: 'attachement',
                    tooltip: '附件管理',
                    handler: 'onAttachmentManage'
                }
            ]
        }
    ],
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate(
            '<p><b>内容:</b> {content}</p>',
            {
                formatChange: function (v) {
                    var color = v >= 0 ? 'green' : 'red';
                    return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
                }
            })
    }],
});
