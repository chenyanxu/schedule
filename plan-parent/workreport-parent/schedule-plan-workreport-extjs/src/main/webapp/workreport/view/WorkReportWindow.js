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
                    fieldLabel: '标题',
                    editable: false,
                    allowBlank: false,
                    bind: {
                        value: '{rec.title}'
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
                    },
                    listeners: {
                        'change': function (e, t, options) {
                            var nowDate = new Date();
                            var year = nowDate.getFullYear();
                            var month = nowDate.getMonth() + 1;
                            var day = nowDate.getDate();
                            var week = Ext.Date.getWeekOfYear(nowDate);
                            var weekDay = nowDate.getDay();

                            var beginDate = new Date();
                            var endDate = new Date();
                            var title = '';
                            if(t==0) {//日报
                                title = year + '年' + month + '月' + day + '日 日报';
                            }
                            if(t==1) {//周报
                                title = year + '年第' + week + '周 周报';
                                beginDate.setDate(beginDate.getDate() - weekDay + 1);
                                endDate.setDate(beginDate.getDate() + 4);
                            }
                            if(t==2) {//月报
                                title = year + '年' + month + '月 月报';
                                beginDate = Ext.Date.getFirstDateOfMonth(nowDate);
                                endDate = Ext.Date.getLastDateOfMonth(nowDate);
                            }
                            this.lookupViewModel().get('rec').set('beginDate', beginDate);
                            this.lookupViewModel().get('rec').set('endDate', endDate);
                            this.lookupViewModel().get('rec').set('title', title);
                        }
                    }
                },
                {
                    fieldLabel: '开始日期',
                    allowBlank: false,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    bind: {
                        value: '{rec.beginDate}'
                    },
                    listeners: {
                        'change': function (e, t, options) {
                            var nowDate = t;
                            var year = nowDate.getFullYear();
                            var month = nowDate.getMonth() + 1;
                            var day = nowDate.getDate();
                            var week = Ext.Date.getWeekOfYear(nowDate);
                            var weekDay = nowDate.getDay();

                            var beginDate = new Date(t);
                            var endDate = new Date(t);
                            var title = '';

                            var workType = this.lookupViewModel().get('rec').get('workType');
                            if (workType == 0) {//日报
                                title = year + '年' + month + '月' + day + '日 日报';
                            }
                            if (workType == 1) {//周报
                                title = year + '年第' + week + '周 周报';
                                beginDate.setDate(beginDate.getDate() - weekDay + 1);
                                endDate.setDate(beginDate.getDate() + 4);
                            }
                            if (workType == 2) {//月报
                                title = year + '年' + month + '月 月报';
                                beginDate = Ext.Date.getFirstDateOfMonth(nowDate);
                                endDate = Ext.Date.getLastDateOfMonth(nowDate);
                            }
                            this.lookupViewModel().get('rec').set('beginDate', beginDate);
                            this.lookupViewModel().get('rec').set('endDate', endDate);
                            this.lookupViewModel().get('rec').set('title', title);
                        }
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
                    id: 'workReportPlanType',
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
                    xtype: 'planComboBox',
                    id: 'workReportPlanComboBox',
                    allowBlank: false,
                    bind: {
                        value: '{rec.planId}'
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