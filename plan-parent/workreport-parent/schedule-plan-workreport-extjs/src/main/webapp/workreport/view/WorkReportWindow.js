/**
 * 工作汇报新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.workreport.view.WorkReportWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.plan.workreport.component.PlanComboBox',
        'kalix.admin.user.component.UserTagField',
        'kalix.admin.user.component.UserOrgComboBox'
    ],
    alias: 'widget.workreportWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "workreportWindow",
    width: 400,
    //todo 在此修改表单
    items: [
        {
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
                    fieldLabel: '部门名称',
                    xtype: 'userOrgComboBox',
                    allowBlank: false,
                    bind: {
                        value: '{rec.orgId}'
                    },
                    listeners: {
                        'change': function (e, t, options) {
                            this.lookupViewModel().get('rec').set('orgName', e.displayTplData[0].name);
                            this.lookupViewModel().get('rec').set('orgCode', e.displayTplData[0].code);
                        }
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
                    hidden: true,
                    bind: {
                        value: '{rec.orgName}'
                    }
                },
                {
                    fieldLabel: '汇报类型',
                    xtype: 'scheduleDictCombobox',
                    dictType: '汇报类型',
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
                    fieldLabel: '计划类型',
                    xtype: 'combobox',
                    store: Ext.create("kalix.plan.workreport.store.PlanStore"),
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    autoSelect: true,
                    allowBlank: false,
                    editable: false,
                    bind: {
                        value: '{rec.planType}'
                    },
                    listeners: {
                        'change': function(box, newValue, oldValue) {
                            var x = Ext.getCmp('workReportPersonalPlanComboBox');
                            x.clearValue();
                            x.store.removeAll();

                            if (newValue == 1) {
                                x.setStore(Ext.create("kalix.plan.personalplan.store.PersonalPlanStore"));
                                x.store.load();
                            }
                            else if (newValue == 2) {
                                x.setStore(Ext.create("kalix.plan.departmentplan.store.DepartmentPlanStore"));
                                x.store.load();
                            }

                        }
                    }
                },
                {
                    fieldLabel: '关联计划',
                    xtype: 'planComboBox',
                    id: 'workReportPersonalPlanComboBox',
                    allowBlank: false,
                    bind: {
                        value: '{rec.planId}'
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