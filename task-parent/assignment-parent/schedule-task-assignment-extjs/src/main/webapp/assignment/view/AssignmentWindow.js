/**
 * 布置任务添加和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.AssignmentWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.task.assignment.controller.AssignmentWindowController',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.admin.user.component.UserComboBox',
        'kalix.admin.user.component.UserTagField',
        'kalix.admin.user.component.UserOrgComboBox',
        'kalix.plan.departmentplan.component.DepartmentPlanComboBox',
        'kalix.task.assignment.component.AssignmentComboBox',
        'kalix.view.components.common.BaseComboBox'
    ],
    alias: 'widget.assignmentWindow',
    controller: {
        type: 'assignmentWindowController'
    },
    xtype: "assignmentWindow",
    width: 800,
    items: [
        {
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
                    listeners:{
                        'change':function(e,t,options) {
                            if(e.displayTplData.length != 0) {
                                this.lookupViewModel().get('rec').set('orgName', e.displayTplData[0].name);
                                this.lookupViewModel().get('rec').set('orgCode', e.displayTplData[0].code);
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
                },{
                    fieldLabel: '部门名称',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.orgName}'
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
                                Ext.getCmp("schedule_task_assignment_sourceId").show();
                                Ext.getCmp("schedule_task_assignment_sourceId").store.proxy.url = CONFIG.restRoot + '/camel/rest/departmentplancomboboxs';
                                Ext.getCmp("schedule_task_assignment_sourceId").value="";
                                Ext.getCmp("schedule_task_assignment_sourceId").store.load();
                            }
                            else if(t=='1'){
                                Ext.getCmp("schedule_task_assignment_sourceId").store.proxy.url = CONFIG.restRoot + '/camel/rest/assignmentcomboboxs';
                                Ext.getCmp("schedule_task_assignment_sourceId").store.load();
                                Ext.getCmp("schedule_task_assignment_sourceId").value="";
                                Ext.getCmp("schedule_task_assignment_sourceId").show();
                            }
                            else{
                                Ext.getCmp("schedule_task_assignment_sourceId").value="";
                                Ext.getCmp("schedule_task_assignment_sourceId").hide();
                            }
                        }
                    }
                },
                {
                    fieldLabel: '来源于',
                    allowBlank: false,
                    id: 'schedule_task_assignment_sourceId',
                    xtype: 'combo',
                    valueField: 'id',
                    displayField: 'title',
                    queryParam: 'title',
                    modelField:'id',
                    hidden: true,
                    bind: {
                        value: '{rec.sourceId}'
                    },
                    store: Ext.create('kalix.store.BaseStore', {
                        autoLoad: false,
                        proxyUrl: CONFIG.restRoot + '/camel/rest/departmentplancomboboxs'
                    })
                },
                {
                    fieldLabel: '内容',
                    allowBlank: false,
                    xtype: 'textarea',
                    bind: {
                        value: '{rec.content}'
                    }
                },
                {
                    fieldLabel: '开始日期',
                    allowBlank: false,
                    editable: false,
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
                    editable: false,
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
                    allowBlank: false,
                    xtype: 'userCombobox',
                    reference:'headCombobox',
                    valueField: 'id',
                    displayField: 'name',
                    modelField:'head',
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
                    bind: {
                        value: '{rec.participant}'
                    }
                },
                {
                    fieldLabel: '奖罚标准',
                    xtype: 'textarea',
                    bind: {
                        value: '{rec.rewardStandard}'
                    }
                },
                {
                    fieldLabel: '领导批示',
                    xtype: 'textarea',
                    bind: {
                        value: '{rec.instruction}'
                    }
                }
            ]
        }
    ]
})
;