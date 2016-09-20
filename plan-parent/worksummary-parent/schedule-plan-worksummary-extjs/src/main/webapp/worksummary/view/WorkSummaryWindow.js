/**
 * 工作总结添加和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.worksummary.view.WorkSummaryWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.admin.user.component.UserTagField',
        'kalix.admin.user.component.UserOrgComboBox'
    ],
    alias: 'widget.worksummaryWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "worksummaryWindow",
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
                    fieldLabel: '总结类型',
                    xtype: 'scheduleDictCombobox',
                    dictType: '总结类型',
                    bind: {
                        value: '{rec.workType}'
                    },
                    listeners: {
                        'change': function (e, t, options) {
                            var nowDate = new Date();
                            var year = nowDate.getFullYear();
                            var beginDate = new Date();
                            var endDate = new Date();
                            if(t==0){
                                beginDate.setMonth(0);
                                beginDate.setDate(1);
                                endDate.setMonth(5);
                                endDate.setDate(30);
                            }
                            if(t==1){
                                beginDate.setMonth(6);
                                beginDate.setDate(1);
                                endDate.setMonth(11);
                                endDate.setDate(31);
                            }
                            if(t==2){
                                beginDate.setMonth(0);
                                beginDate.setDate(1);
                                endDate.setMonth(11);
                                endDate.setDate(31);
                            }
                            var title = year + '-' + e.lastMutatedValue;
                            this.lookupViewModel().get('rec').set('title', title);
                            this.lookupViewModel().get('rec').set('beginDate', beginDate);
                            this.lookupViewModel().get('rec').set('endDate', endDate);
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
                            var beginDate = new Date(t);
                            var endDate = new Date(t);
                            var title;
                            var workType = this.lookupViewModel().get('rec').get('workType');
                            if(workType==0){
                                beginDate.setMonth(0);
                                beginDate.setDate(1);
                                endDate.setMonth(5);
                                endDate.setDate(30);
                                title = year + '-上半年总结';
                            }
                            if(workType==1){
                                beginDate.setMonth(6);
                                beginDate.setDate(1);
                                endDate.setMonth(11);
                                endDate.setDate(31);
                                title = year + '-下半年总结';
                            }
                            if(workType==2){
                                beginDate.setMonth(0);
                                beginDate.setDate(1);
                                endDate.setMonth(11);
                                endDate.setDate(31);
                                title = year + '-年总结';
                            }
                            this.lookupViewModel().get('rec').set('title', title);
                            this.lookupViewModel().get('rec').set('beginDate', beginDate);
                            this.lookupViewModel().get('rec').set('endDate', endDate);
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