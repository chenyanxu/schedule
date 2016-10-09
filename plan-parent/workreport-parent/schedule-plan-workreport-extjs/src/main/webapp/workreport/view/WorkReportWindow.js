/**
 * 工作汇报添加和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.workreport.view.WorkReportWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.plan.workreport.controller.WorkReportController',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.plan.workreport.component.PlanComboBox',
        'kalix.admin.user.component.UserTagField',
        'kalix.admin.user.component.UserOrgComboBox'
    ],
    alias: 'widget.workreportWindow',
    controller: {
        type: 'workReportController'
    },
    xtype: "workreportWindow",
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
                            width: 910,
                            margin: '10 5 5 5',
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
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            xtype: 'userOrgComboBox',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
                            bind: {
                                value: '{rec.orgId}'
                            },
                            listeners: {
                                'change': function (e, t, options) {
                                    if (e.displayTplData[0]) {
                                        this.lookupViewModel().get('rec').set('orgName', e.displayTplData[0].name);
                                        this.lookupViewModel().get('rec').set('orgCode', e.displayTplData[0].code);
                                    }
                                }
                            }
                        },
                        {
                            fieldLabel: '开始日期',
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            allowBlank: false,
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
                            bind: {
                                value: '{rec.beginDate}'
                            },
                            listeners: {
                                'change': function (e, t, options) {
                                    var model = this.lookupViewModel().get('rec');
                                    if (model.get('id') != 0)
                                        return;
                                    var nowDate = t;
                                    var year = nowDate.getFullYear();
                                    var month = nowDate.getMonth() + 1;
                                    if (month < 10) month = '0' + month;
                                    var day = nowDate.getDate();
                                    if (day < 10) day = '0' + day;
                                    var week = Ext.Date.getWeekOfYear(nowDate);
                                    var weekDay = nowDate.getDay();

                                    var beginDate = new Date(t);
                                    var endDate = new Date(t);
                                    var title = '';

                                    var workType = this.lookupViewModel().get('rec').get('workType');
                                    if (workType == 0) {//日报
                                        title = year + '' + month + '' + day + '-日报';
                                    }
                                    if (workType == 1) {//周报
                                        title = year + '第' + week + '周-周报';
                                        beginDate.setDate(beginDate.getDate() - weekDay + 1);
                                        endDate.setDate(beginDate.getDate() + 4);
                                    }
                                    if (workType == 2) {//月报
                                        title = year + '' + month + '-月报';
                                        beginDate = Ext.Date.getFirstDateOfMonth(nowDate);
                                        endDate = Ext.Date.getLastDateOfMonth(nowDate);
                                    }
                                    model.set('beginDate', beginDate);
                                    model.set('endDate', endDate);
                                    model.set('title', title);
                                    model.modified = {};
                                    model.dirty = false;
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
                            fieldLabel: '汇报类型',
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            xtype: 'scheduleDictCombobox',
                            dictType: '汇报类型',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
                            bind: {
                                value: '{rec.workType}'
                            },
                            listeners: {
                                'change': function (e, t, options) {
                                    var model = this.lookupViewModel().get('rec');
                                    if (model.get('id') != 0)
                                        return;
                                    var nowDate = new Date();
                                    var year = nowDate.getFullYear();
                                    var month = nowDate.getMonth() + 1;
                                    if (month < 10) month = '0' + month;
                                    var day = nowDate.getDate();
                                    if (day < 10) day = '0' + day;
                                    var week = Ext.Date.getWeekOfYear(nowDate);
                                    var weekDay = nowDate.getDay();

                                    var beginDate = new Date();
                                    var endDate = new Date();
                                    var title = '';
                                    if (t == 0) {//日报
                                        title = year + month + day + '-日报';
                                    }
                                    if (t == 1) {//周报
                                        title = year + '第' + week + '周-周报';
                                        beginDate.setDate(beginDate.getDate() - weekDay + 1);
                                        endDate.setDate(beginDate.getDate() + 4);
                                    }
                                    if (t == 2) {//月报
                                        title = year + month + '-月报';
                                        beginDate = Ext.Date.getFirstDateOfMonth(nowDate);
                                        endDate = Ext.Date.getLastDateOfMonth(nowDate);
                                    }
                                    model.set('beginDate', beginDate);
                                    model.set('endDate', endDate);
                                    model.set('title', title);
                                    model.modified = {};
                                    model.dirty = false;
                                }
                            }
                        },
                        {
                            fieldLabel: '结束日期',
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            allowBlank: false,
                            xtype: 'datefield',
                            format: 'Y-m-d',
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
                            fieldLabel: '计划类型',
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
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
                            bind: {
                                value: '{rec.planType}'
                            },
                            listeners: {
                                'change': function (box, newValue, oldValue) {
                                    var vm = this.lookupViewModel();
                                    vm.get('rec').set('planId', 0);
                                    var x = Ext.getCmp('workReportPlanComboBox');
                                    x.clearValue();
                                    x.store.removeAll();
                                    x.setVisible(false);

                                    if (newValue == 1) {
                                        x.setStore(Ext.create("kalix.plan.personalplan.store.PersonalPlanStore"));
                                        x.store.load();
                                        x.setVisible(true);
                                    }
                                    else if (newValue == 2) {
                                        x.setStore(Ext.create("kalix.plan.departmentplan.store.DepartmentPlanStore"));
                                        x.store.load();
                                        x.setVisible(true);
                                    }

                                }
                            }
                        },
                        {
                            fieldLabel: '关联计划',
                            beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                            xtype: 'planComboBox',
                            id: 'workReportPlanComboBox',
                            allowBlank: false,
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 450,
                            margin: 5,
                            bind: {
                                value: '{rec.planId}'
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
