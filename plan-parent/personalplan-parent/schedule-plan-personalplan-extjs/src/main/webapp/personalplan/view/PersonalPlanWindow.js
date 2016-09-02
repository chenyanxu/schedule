/**
 * 个人计划新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.personalplan.view.PersonalPlanWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.admin.user.component.UserTagField',
        'kalix.admin.user.component.UserOrgComboBox'
    ],
    alias: 'widget.personalplanWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "personalplanWindow",
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
                    fieldLabel: '部门名称',
                    allowBlank: false,
                    hidden: true,
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
});