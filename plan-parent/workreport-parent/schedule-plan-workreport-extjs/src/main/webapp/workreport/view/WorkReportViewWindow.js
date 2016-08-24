/**
 * 工作汇报查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.plan.workreport.view.WorkReportViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    alias: 'widget.workreportViewWindow',
    xtype: "workreportViewWindow",
    width: 400,
    //todo 在此修改查看字段
    items: [
        {
            defaults: {readOnly: true},
            xtype: 'baseForm',
            items: [
                {
                    fieldLabel: '用户id',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.userId}'
                    }
                },
                {
                    fieldLabel: '用户名',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.userName}'
                    }
                },
                {
                    fieldLabel: '部门id',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.orgId}'
                    }
                },
                {
                    fieldLabel: '部门code',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.orgCode}'
                    }
                },
                {
                    fieldLabel: '部门名',
                    allowBlank: false,
                    bind: {
                        value: '{rec.orgName}'
                    }
                },
                {
                    fieldLabel: '汇报类型',
                    xtype: 'scheduleDictCombobox',
                    dictType: '汇报类型',
                    allowBlank: false,
                    bind: {
                        value: '{rec.workType}'
                    }
                },
                {
                    fieldLabel: '开始日期',
                    allowBlank: false,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    bind: {
                        value: '{rec.beginDate}'
                    }
                },
                {
                    fieldLabel: '结束日期',
                    allowBlank: false,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    bind: {
                        value: '{rec.endDate}'
                    }
                },
                {
                    fieldLabel: '标题',
                    allowBlank: false,
                    bind: {
                        value: '{rec.title}'
                    }
                },
                {
                    fieldLabel: '内容',
                    allowBlank: false,
                    xtype: 'textarea',
                    bind: {
                        value: '{rec.content}'
                    }
                }
            ]
        }
    ]
});