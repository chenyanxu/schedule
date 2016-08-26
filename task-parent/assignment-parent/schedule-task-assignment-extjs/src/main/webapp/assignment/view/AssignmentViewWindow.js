/**
 * 布置任务查看表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.AssignmentViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.task.assignment.controller.AssignmentWindowController',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.plan.departmentplan.component.DepartmentPlanComboBox',
        'kalix.task.assignment.component.AssignmentComboBox',
        'kalix.admin.user.component.UserTagField',
        'kalix.task.assignment.view.EventGrid'
    ],
    alias: 'widget.assignmentViewWindow',
    xtype: "assignmentViewWindow",
    controller: {
        type: 'assignmentWindowController'
    },
    width: 800,
    height: 640,
    //todo 在此修改查看字段
    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    title: '基本资料',
                    xtype: 'panel',
                    align: 'center',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {width: 400},
                    items: [
                        {
                            defaults: {readOnly: true},
                            xtype: 'baseForm',
                            items: [
                                {
                                    text: '任务主键',
                                    dataIndex: 'id',
                                    hidden: true,
                                    bind: {
                                        value: '{rec.id}'
                                    }
                                },
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
                                    fieldLabel: '部门id',
                                    allowBlank: false,
                                    hidden: true,
                                    bind: {
                                        value: '{rec.orgId}'
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
                                    }
                                },
                                {
                                    fieldLabel: '来源于',
                                    xtype: 'baseComboBox',
                                    valueField: 'id',
                                    displayField: 'title',
                                    queryParam: 'title',
                                    modelField: 'id',
                                    bind: {
                                        value: '{rec.sourceId}'
                                    },
                                    store: Ext.create('kalix.store.BaseStore', {
                                        autoLoad: false,
                                        proxyUrl: '/kalix/camel/rest/departmentplans'
                                    }),
                                    listeners: {
                                        render: function (target) {
                                            var sourceType = this.lookupViewModel().get('rec').get('sourceType');

                                            if (sourceType == "0") {
                                                target.store.proxy.url = '/kalix/camel/rest/departmentplans';
                                                target.store.load();
                                            }
                                            else if (sourceType == "1") {
                                                target.store.proxy.url = '/kalix/camel/rest/assignments';
                                                target.store.load();
                                            }
                                            else {

                                            }
                                        }
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
                                {
                                    fieldLabel: '任务状态',
                                    xtype: 'scheduleDictCombobox',
                                    dictType: '任务状态',
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
                                    fieldLabel: '任务进度(%)',
                                    allowBlank: false,
                                    xtype: 'numberfield',
                                    maxValue: 100,
                                    minValue: 0,
                                    bind: {
                                        value: '{rec.percent}'
                                    }
                                },
                                {
                                    fieldLabel: '进度说明',
                                    allowBlank: false,
                                    xtype: 'textarea',
                                    bind: {
                                        value: '{rec.comment}'
                                    }
                                }
                            ]
                        },
                        {
                            defaults: {readOnly: true},
                            xtype: 'baseForm',
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
                                    bind: {
                                        value: '{rec.header}'
                                    }
                                },
                                {
                                    fieldLabel: '参与人',
                                    xtype: 'userTagField',
                                    store:{
                                        type:'userStore',
                                        pageSize:0
                                    },
                                    valueField: 'id',
                                    displayField: 'name',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.participant}'
                                    }
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: '奖罚标准',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.rewardStandard}'
                                    }
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: '领导批示',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.instruction}'
                                    }
                                },
                                {
                                    fieldLabel: '评分',
                                    allowBlank: false,
                                    xtype: 'numberfield',
                                    maxValue: 100,
                                    minValue: 0,
                                    bind: {
                                        value: '{rec.score}'
                                    }
                                },
                                {
                                    fieldLabel: '任务意见',
                                    allowBlank: false,
                                    xtype: 'textarea',
                                    bind: {
                                        value: '{rec.advice}'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '事件列表',
                    xtype: 'panel',
                    align: 'center',
                    border: false,
                    items: [
                        {
                            xtype: 'eventGridPanel',
                            id: 'eventGridPanel',
                            //title: '事件列表',
                            margin: 10
                        }
                    ],
                    listeners: {
                        'activate': function (target, eOpts) {
                            var assignmentId = eOpts.items.items[0].items.items[0].value;
                            Ext.getCmp("eventGridPanel").store.proxy.url = '/kalix/camel/rest/assignments/' + assignmentId + '/events';
                            Ext.getCmp("eventGridPanel").store.proxy.extraParams = {'assignmentId': assignmentId};
                            Ext.getCmp("eventGridPanel").store.load();
                        }
                    }
                }
            ]
        }
    ],
    buttons: [
        {
            text: '接受任务',
            iconCls: 'iconfont icon-schedule-task-accept',
            handler: 'onAccept',
            bind: {
                //如果当前登录用户是任务的负责人,那么可以接受任务
                hidden: '{accept}'
            }
        },
        {
            text: '拒绝接受',
            iconCls: 'iconfont icon-schedule-task-reject',
            handler: 'onReject',
            bind: {
                hidden: '{accept}'
            }
        },
        {
            text: '关闭',
            glyph: 'xf00d@FontAwesome',
            handler: function () {
                this.up('window').close();
            }
        }
    ]
});