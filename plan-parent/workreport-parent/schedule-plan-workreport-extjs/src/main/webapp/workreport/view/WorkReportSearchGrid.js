/**
 * 个人计划表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.workreport.view.WorkReportSearchGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.plan.workreport.controller.WorkReportGridController',
        'kalix.plan.workreport.store.WorkReportStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn',
        'kalix.view.components.common.IconColumn'
    ],
    alias: 'widget.workreportsearchGrid',
    xtype: 'workreportsearchGridPanel',
    controller: {
        type: 'workreportGridController',
        cfgForm: 'kalix.plan.workreport.view.WorkReportWindow',
        cfgViewForm: 'kalix.plan.workreport.view.WorkReportViewWindow',
        cfgModel: 'kalix.plan.workreport.model.WorkReportModel'
    },
    store: {
        type: 'workreportStore',
        proxyUrl: CONFIG.restRoot + '/camel/rest/workreportsearchs'
    },
    autoLoad: false,

    columns: [
        {
            xtype: 'rownumberer'
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
            text: '汇报类型',
            xtype: 'scheduleDictGridColumn',
            dictType: '汇报类型',
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
