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
    width: 930,
    height: 600,
    planTitle: 'test',
    //todo 在此修改查看字段
    items: [
        {
            xtype: 'tabpanel',
            id: 'departmentPlanTaskTabPanel',
            items: [
                {
                    xtype: 'panel',
                    title: '基本信息',
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
                                type: 'hbox',
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
                                    width: 910,
                                    margin: '10 5 5 5',
                                    readOnly: true,
                                    bind: {
                                        value: '{rec.title}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
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
                                type: 'hbox',
                            },
                            width: '100%',
                            border: false,
                            items: [
                                {
                                    fieldLabel: '汇报类型',
                                    xtype: 'scheduleDictCombobox',
                                    dictType: '汇报类型',
                                    allowBlank: false,
                                    labelAlign: 'right',
                                    labelWidth: 80,
                                    width: 450,
                                    margin: 5,
                                    readOnly: true,
                                    bind: {
                                        value: '{rec.workType}'
                                    }
                                },
                                {
                                    fieldLabel: '开始日期',
                                    allowBlank: false,
                                    xtype: 'datefield',
                                    format: 'Y-m-d',
                                    labelAlign: 'right',
                                    labelWidth: 80,
                                    width: 450,
                                    margin: 5,
                                    readOnly: true,
                                    bind: {
                                        value: '{rec.beginDate}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                            },
                            width: '100%',
                            border: false,
                            items: [
                                {
                                    fieldLabel: '计划类型',
                                    xtype: 'combobox',
                                    id: 'workReportPlanType',
                                    store: Ext.create("kalix.plan.workreport.store.PlanStore"),
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'value',
                                    autoSelect: true,
                                    allowBlank: false,
                                    editable: false,
                                    labelAlign: 'right',
                                    labelWidth: 80,
                                    width: 450,
                                    margin: 5,
                                    readOnly: true,
                                    bind: {
                                        value: '{rec.planType}'
                                    },
                                    listeners: {
                                        'render': function (target) {
                                            // 计划类型
                                            var sourceType = this.lookupViewModel().get('rec').get('planType');

                                            var store;

                                            if (sourceType == 1) {
                                                // 个人计划
                                                store = Ext.create("kalix.plan.personalplan.store.PersonalPlanStore");
                                            }
                                            else if (sourceType == 2) {
                                                // 部门计划
                                                store = Ext.create("kalix.plan.departmentplan.store.DepartmentPlanStore");
                                            }


                                            if (store != null) {
                                                var id = this.lookupViewModel().get('rec').get('planId');
                                                if (id != null && id != '') {
                                                    store.setProxy({
                                                        type: 'ajax',
                                                        url: store.proxyUrl + '/' + id
                                                    });

                                                    store.load({
                                                        'callback': function (records, options, success) {
                                                            Ext.getCmp('workReportPlanTitle').setValue(records[0].data.title);
                                                            Ext.getCmp('workReportPlanContent').setValue(records[0].data.content);
                                                        }
                                                    });
                                                }
                                            }
                                            else {
                                                var workreportPlan = Ext.getCmp('workreportPlan');
                                                workreportPlan.setVisible(false);
                                            }
                                        }
                                    }
                                },
                                {
                                    fieldLabel: '结束日期',
                                    allowBlank: false,
                                    xtype: 'datefield',
                                    format: 'Y-m-d',
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
                                type: 'hbox',
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
                },
                {
                    xtype: 'panel',
                    title: '关联计划',
                    id: 'workreportPlan',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    width: '100%',
                    items: [
                        {
                            fieldLabel: '计划标题',
                            xtype: 'textfield',
                            id: 'workReportPlanTitle',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 910,
                            margin: '10 5 5 5',
                            readOnly: true
                        },
                        {
                            fieldLabel: '计划内容',
                            xtype: 'htmleditor',
                            id: 'workReportPlanContent',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            margin: 5,
                            height: 400,
                            readOnly: true
                        }
                    ]
                }
            ]
        }
    ]

});