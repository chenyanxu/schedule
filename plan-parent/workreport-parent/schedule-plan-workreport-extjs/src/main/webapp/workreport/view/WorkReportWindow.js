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
        'kalix.plan.personalplan.component.PersonalPlanComboBox',
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
                    valueField: 'orgId',
                    displayField: 'orgName',
                    allowBlank: false,
                    bind: {
                        value: '{rec.orgId}'
                    },
                    listeners: {
                        'change': function (e, t, options) {
                            this.lookupViewModel().get('rec').set('orgName', e.displayTplData[0].orgName);
                            this.lookupViewModel().get('rec').set('orgCode', e.displayTplData[0].orgCode);
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
                    xtype: 'scheduleDictCombobox',
                    dictType: '计划类型',
                    allowBlank: false,
                    bind: {
                        value: '{rec.planType}'
                    },
                    listeners: {
                        'change': function(box, newValue, oldValue) {
                            var x = Ext.getCmp('workReportPersonalPlanComboBox');
                            var jsonObjNew = {};

                            jsonObjNew['planType'] = newValue;

                            var jsonStr = Ext.JSON.encode(jsonObjNew);

                            x.clearValue();
                            x.store.proxy.extraParams = {'jsonStr': jsonStr};
                            x.store.load();
                        }
                    }
                },
                {
                    fieldLabel: '个人计划',
                    xtype: 'personalPlanComboBox',
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