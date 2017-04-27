/**
 * 工作总结查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.plan.worksummary.view.WorkSummaryViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    alias: 'widget.worksummaryViewWindow',
    xtype: 'worksummaryViewWindow',
    width: 930,
    height: 510,
    //todo 在此修改查看字段
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            border: false,
            width: '100%',
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox'
                    },
                    width: '100%',
                    border: false,
                    items: [
                        {
                            fieldLabel: '标题',
                            xtype: 'textfield',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: '10 5 5 5',
                            readOnly: true,
                            bind: {
                                value: '{rec.title}'
                            }
                        },
                        {
                            fieldLabel: '总结类型',
                            xtype: 'scheduleDictCombobox',
                            dictType: '总结类型',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: '10 5 5 5',
                            readOnly: true,
                            bind: {
                                value: '{rec.workType}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox'
                    },
                    width: '100%',
                    border: false,
                    items: [
                        {
                            fieldLabel: '部门名称',
                            xtype: 'textfield',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
                            readOnly: true,
                            bind: {
                                value: '{rec.orgName}'
                            }
                        },
                        {
                            fieldLabel: '用户姓名',
                            xtype: 'textfield',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
                            readOnly: true,
                            bind: {
                                value: '{rec.userName}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox'
                    },
                    width: '100%',
                    border: false,
                    items: [
                        {
                            fieldLabel: '开始日期',
                            allowBlank: false,
                            xtype: 'datefield',
                            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
                            readOnly: true,
                            bind: {
                                value: '{rec.beginDate}'
                            }
                        },
                        {
                            fieldLabel: '结束日期',
                            allowBlank: false,
                            xtype: 'datefield',
                            format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
                            readOnly: true,
                            bind: {
                                value: '{rec.endDate}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox'
                    },
                    width: '100%',
                    border: false,
                    items: [
                        {
                            fieldLabel: '内容',
                            xtype: 'htmleditor',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            margin: 5,
                            height: 270,
                            readOnly: true,
                            bind: {
                                value: '{rec.content}'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});