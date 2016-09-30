/**
 * 部门计划添加和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.view.DepartmentPlanWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.plan.departmentplan.controller.DepartmentPlanWindowController',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.admin.user.component.UserTagField',
        'kalix.admin.user.component.UserOrgComboBox'
    ],
    alias: 'widget.departmentplanWindow',
    controller: {
        type: 'departmentPlanWindowController'
    },
    xtype: "departmentplanWindow",
    width: 930,
    //todo 在此修改表单
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
                        type: 'hbox',
                    },
                    width: '100%',
                    border: false,
                    items: [
                        {
                            fieldLabel: '标题',
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            xtype: 'textfield',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: '10 5 5 5',
                            bind: {
                                value: '{rec.title}'
                            }
                        },
                        {
                            fieldLabel: '部门名称',
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            xtype: 'userOrgComboBox',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: '10 5 5 5',
                            bind: {
                                value: '{rec.orgId}'
                            },
                            listeners: {
                                'change': function (e, t, options) {
                                    this.lookupViewModel().get('rec').set('orgName', e.displayTplData[0].name);
                                    this.lookupViewModel().get('rec').set('orgCode', e.displayTplData[0].code);
                                }
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
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            xtype: 'scheduleDictCombobox',
                            dictType: '部门计划类型',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
                            bind: {
                                value: '{rec.planType}'
                            }
                        },
                        {
                            fieldLabel: '开始日期',
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            allowBlank: false,
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            minValue: new Date(),
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
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
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            xtype: 'scheduleDictCombobox',
                            dictType: '部门计划状态',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
                            bind: {
                                value: '{rec.state}'
                            }
                        },
                        {
                            fieldLabel: '结束日期',
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            allowBlank: false,
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            minValue: new Date(),
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
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
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            xtype: 'htmleditor',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            margin: 5,
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