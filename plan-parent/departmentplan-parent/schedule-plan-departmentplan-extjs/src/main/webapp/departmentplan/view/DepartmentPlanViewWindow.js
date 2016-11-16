/**
 * 部门计划查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.plan.departmentplan.view.DepartmentPlanViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    alias: 'widget.departmentplanViewWindow',
    xtype: "departmentplanViewWindow",
    requires: [
        'kalix.plan.workreport.view.WorkReportViewGrid',
        'kalix.task.assignment.view.DepartmentTaskGrid'
    ],
    width: 930,
    height: 600,
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
                                    fieldLabel: '计划类型',
                                    xtype: 'scheduleDictCombobox',
                                    dictType: '部门计划类型',
                                    allowBlank: false,
                                    labelAlign: 'right',
                                    labelWidth: 80,
                                    width: 450,
                                    margin: 5,
                                    readOnly: true,
                                    bind: {
                                        value: '{rec.planType}'
                                    }
                                },
                                {
                                    fieldLabel: '开始日期',
                                    allowBlank: false,
                                    xtype: 'datefield',
                                    format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
                                    minValue: new Date(),
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
                                    fieldLabel: '计划状态',
                                    xtype: 'scheduleDictCombobox',
                                    dictType: '部门计划状态',
                                    allowBlank: false,
                                    labelAlign: 'right',
                                    labelWidth: 80,
                                    width: 450,
                                    margin: 5,
                                    readOnly: true,
                                    bind: {
                                        value: '{rec.state}'
                                    }
                                },
                                {
                                    fieldLabel: '结束日期',
                                    allowBlank: false,
                                    xtype: 'datefield',
                                    format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
                                    minValue: new Date(),
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
                    xtype: 'workreportviewGridPanel',
                    title: '工作汇报列表',
                    margin: 10,
                    bind: {
                        planId: '{rec.id}'
                    }
                },
                {
                    xtype: 'departmentTaskGridPanel',
                    id: 'departmentTaskGridPanel',
                    title: '任务列表',
                    margin: 10,
                    listeners: {
                        'activate': function (target, eOpts) {
                            var departmentPlanId = this.lookupViewModel().get('rec').get('id');
                            var jsonStr = {
                                'sourceId':departmentPlanId
                            };
                            jsonStr = Ext.JSON.encode(jsonStr);
                            Ext.getCmp("departmentTaskGridPanel").store.proxy.url = CONFIG.restRoot + '/camel/rest/assignments/' + departmentPlanId + '/tasks';
                            Ext.getCmp("departmentTaskGridPanel").store.proxy.extraParams = {'jsonStr':jsonStr};
                            Ext.getCmp("departmentTaskGridPanel").store.load();
                        }
                    }
                }
            ]
        }
    ]
});