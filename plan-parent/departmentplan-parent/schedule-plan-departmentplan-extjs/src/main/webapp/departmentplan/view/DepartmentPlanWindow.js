/**
 * 部门计划新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.plan.departmentplan.view.DepartmentPlanWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.admin.user.component.UserTagField',
        'kalix.admin.user.component.UserOrgComboBox'
    ],
    alias: 'widget.departmentplanWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "departmentplanWindow",
    width: 400,
    //todo 在此修改表单
    items: [
        {
            xtype: 'baseForm',
            items: [
                {
                    fieldLabel: '用户ID',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.userId}'
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
                    listeners:{
                        'change':function(e,t,options) {
                            if(e.displayTplData.length != 0) {
                                this.lookupViewModel().get('rec').set('orgName', e.displayTplData[0].orgName);
                                this.lookupViewModel().get('rec').set('orgCode', e.displayTplData[0].orgCode);
                            }
                        }
                    }
                },
                {
                    fieldLabel: '部门代码',
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
                    fieldLabel: '计划标题',
                    allowBlank: false,
                    bind: {
                        value: '{rec.title}'
                    }
                },
                {
                    fieldLabel: '计划内容',
                    allowBlank: false,
                    xtype: 'textarea',
                    bind: {
                        value: '{rec.content}'
                    }
                },
                {
                    fieldLabel: '计划类型',
                    xtype: 'scheduleDictCombobox',
                    dictType: '计划类型',
                    allowBlank: false,
                    bind: {
                        value: '{rec.planType}'
                    }
                },
                {
                    fieldLabel: '计划开始时间',
                    allowBlank: false,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    minValue: new Date(),
                    bind: {
                        value: '{rec.beginDate}'
                    }
                },
                {
                    fieldLabel: '计划结束时间',
                    allowBlank: false,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    minValue: new Date(),
                    bind: {
                        value: '{rec.endDate}'
                    }
                }
                //,
                //{
                //    fieldLabel: '计划状态',
                //    xtype: 'scheduleDictCombobox',
                //    dictType: '计划状态',
                //    allowBlank: false,
                //    bind: {
                //        value: '{rec.state}'
                //    }
                //}
            ]
        }
    ]
});