/**
 * 个人计划查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.plan.personalplan.view.PersonalPlanViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    alias: 'widget.personalplanViewWindow',
    xtype: "personalplanViewWindow",
    requires: [
        'kalix.plan.workreport.view.WorkReportViewGrid'
    ],
    width: 600,
    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    title: '基本信息',
                    xtype: 'panel',
                    align: 'center',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {width: 600},
                    items: [
                        {
                            defaults: {readOnly: true},
                            xtype: 'baseForm',
                            items: [
                                {
                                    fieldLabel: '用户名',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.userName}'
                                    }
                                },
                                {
                                    fieldLabel: '部门名称',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.orgName}'
                                    }
                                },
                                {
                                    fieldLabel: '计划类型',
                                    xtype: 'scheduleDictCombobox',
                                    dictType: '个人计划类型',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.planType}'
                                    }
                                },
                                {
                                    fieldLabel: '计划状态',
                                    xtype: 'scheduleDictCombobox',
                                    dictType: '个人计划状态',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.state}'
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
                },
                {
                    xtype: 'workreportviewGridPanel',
                    title: '工作汇报列表',
                    margin: 10,
                    bind: {
                        planId: '{rec.id}'
                    }
                }
            ]
        }
    ]
});