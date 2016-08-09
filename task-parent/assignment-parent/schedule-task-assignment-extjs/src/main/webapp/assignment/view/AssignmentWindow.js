/**
 * 布置任务新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.AssignmentWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.admin.user.component.UserComboBox',
        'kalix.admin.user.component.UserTagField',
        'kalix.admin.user.component.UserOrgComboBox',
        'kalix.plan.departmentplan.component.DepartmentPlanComboBox',
        'kalix.task.assignment.component.AssignmentComboBox'
    ],
    alias: 'widget.assignmentWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "assignmentWindow",
    width: 800,
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
                    valueField: 'departmentId',
                    displayField: 'departmentName',
                    allowBlank: false,
                    bind: {
                        value: '{rec.departmentId}'
                    },
                    listeners:{
                        'change':function(e,t,options) {
                            this.lookupViewModel().get('rec').set('departmentName',e.displayTplData[0].departmentName);
                        }
                    }
                },
                {
                    fieldLabel: '部门名称',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.departmentName}'
                    }
                },
                {
                    fieldLabel: '任务名称',
                    allowBlank: false,
                    bind: {
                        value: '{rec.title}'
                    }
                },
                {
                    fieldLabel: '任务来源',
                    xtype: 'scheduleDictCombobox',
                    dictType: '任务来源',
                    allowBlank: false,
                    bind: {
                        value: '{rec.sourceType}'
                    },
                    listeners: {
                        'change':function(e,t,options) {
                            if(t=='0'){
                                Ext.getCmp("schedule_task_assignment_sourceId1").show();
                                Ext.getCmp("schedule_task_assignment_sourceId2").hide();
                            }
                            else if(t=='1'){
                                Ext.getCmp("schedule_task_assignment_sourceId1").hide();
                                Ext.getCmp("schedule_task_assignment_sourceId2").show();
                            }
                            else{
                                Ext.getCmp("schedule_task_assignment_sourceId1").hide();
                                Ext.getCmp("schedule_task_assignment_sourceId2").hide();
                            }
                        }
                    }
                },
                {
                    fieldLabel: '来源于',
                    id: 'schedule_task_assignment_sourceId1',
                    xtype: 'departmentPlanComboBox',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.sourceId}'
                    }
                },
                {
                    fieldLabel: '来源于',
                    id: 'schedule_task_assignment_sourceId2',
                    xtype: 'assignmentComboBox',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.sourceId}'
                    }
                },
                {
                    fieldLabel: '内容',
                    allowBlank: false,
                    xtype: 'textarea',
                    bind: {
                        value: '{rec.content}'
                    }
                },
                //{
                //    fieldLabel: '任务状态',
                //    xtype: 'scheduleDictCombobox',
                //    dictType: '任务状态',
                //    allowBlank: false,
                //    bind: {
                //        value: '{rec.state}'
                //    }
                //},
                {
                    fieldLabel: '开始日期',
                    allowBlank: false,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    minValue: new Date(),
                    bind: {
                        value: '{rec.beginDate}'
                    }
                },
                {
                    fieldLabel: '结束日期',
                    allowBlank: false,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    minValue: new Date(),
                    bind: {
                        value: '{rec.endDate}'
                    }
                }
            ]
        },
        {
            items: [
                {
                    fieldLabel: '评估工时',
                    allowBlank: false,
                    bind: {
                        value: '{rec.workHours}'
                    }
                },
                {
                    fieldLabel: '负责人',
                    xtype: 'userCombobox',
                    valueField: 'id',
                    displayField: 'name',
                    //queryParam: 'jsonStr',
                    allowBlank: false,
                    bind: {
                        value: '{rec.head}'
                    }
                },
                {
                    fieldLabel: '参与人',
                    xtype: 'userTagField',
                    valueField: 'id',
                    displayField: 'name',
                    //queryParam: 'jsonStr',
                    allowBlank: false,
                    bind: {
                        value: '{rec.participant}'
                    }
                },
                {
                    fieldLabel: '奖罚标准',
                    xtype: 'textarea',
                    allowBlank: false,
                    bind: {
                        value: '{rec.rewardStandard}'
                    }
                },
                {
                    fieldLabel: '领导批示',
                    xtype: 'textarea',
                    allowBlank: false,
                    bind: {
                        value: '{rec.instruction}'
                    }
                }
            ]
        }
    ]
})
;