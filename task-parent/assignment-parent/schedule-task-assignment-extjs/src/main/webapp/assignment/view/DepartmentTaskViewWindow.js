/**
 * 布置任务查看表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.DepartmentTaskViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.task.assignment.controller.AssignmentWindowController',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.plan.departmentplan.component.DepartmentPlanComboBox',
        'kalix.admin.user.component.UserTagField'
    ],
    alias: 'widget.departmentTaskViewWindow',
    xtype: "departmentTaskViewWindow",
    controller: {
        type: 'assignmentWindowController'
    },
    width: 800,
    height: 640,
    //todo 在此修改查看字段


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
                    hidden: true,
                    bind: {
                        value: '{rec.userId}'
                    }
                },
                {
                    fieldLabel: '用户名',
                    hidden: true,
                    bind: {
                        value: '{rec.userName}'
                    }
                },
                {
                    fieldLabel: '部门id',
                    hidden: true,
                    bind: {
                        value: '{rec.orgId}'
                    }
                },
                {
                    fieldLabel: '部门代码',
                    hidden: true,
                    bind: {
                        value: '{rec.orgCode}'
                    }
                },
                {
                    fieldLabel: '部门名称',
                    hidden: true,
                    bind: {
                        value: '{rec.orgName}'
                    }
                },
                {
                    fieldLabel: '任务名称',
                    bind: {
                        value: '{rec.title}'
                    }
                },
                {
                    fieldLabel: '任务来源',
                    xtype: 'scheduleDictCombobox',
                    dictType: '任务来源',
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
                        proxyUrl: CONFIG.restRoot + '/camel/rest/departmentplans'
                    }),
                    listeners: {
                        render: function (target) {
                            var sourceType = this.lookupViewModel().get('rec').get('sourceType');

                            if (sourceType == "0") {
                                target.store.proxy.url = CONFIG.restRoot + '/camel/rest/departmentplans';
                                target.store.load();
                            }
                            else if (sourceType == "1") {
                                target.store.proxy.url = CONFIG.restRoot + '/camel/rest/assignments';
                                target.store.load();
                            }
                            else {

                            }
                        }
                    }
                },
                {
                    fieldLabel: '内容',
                    xtype: 'textarea',
                    bind: {
                        value: '{rec.content}'
                    }
                },
                {
                    fieldLabel: '任务状态',
                    xtype: 'scheduleDictCombobox',
                    dictType: '任务状态',
                    bind: {
                        value: '{rec.state}'
                    }
                },
                {
                    fieldLabel: '开始日期',
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    bind: {
                        value: '{rec.beginDate}'
                    }
                },
                {
                    fieldLabel: '结束日期',
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    bind: {
                        value: '{rec.endDate}'
                    }
                },
                {
                    fieldLabel: '任务进度(%)',
                    xtype: 'numberfield',
                    maxValue: 100,
                    minValue: 0,
                    bind: {
                        value: '{rec.percentNumber}'
                    }
                },
                {
                    fieldLabel: '进度说明',
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
                    bind: {
                        value: '{rec.workHours}'
                    }
                },
                {
                    fieldLabel: '负责人',
                    bind: {
                        value: '{rec.header}'
                    }
                },
                {
                    fieldLabel: '参与人',
                    xtype: 'userTagField',
                    store: {
                        type: 'userStore',
                        pageSize: 0
                    },
                    valueField: 'id',
                    displayField: 'name',
                    bind: {
                        value: '{rec.participant}'
                    }
                },
                {
                    xtype: 'textarea',
                    fieldLabel: '奖罚标准',
                    bind: {
                        value: '{rec.rewardStandard}'
                    }
                },
                {
                    xtype: 'textarea',
                    fieldLabel: '领导批示',
                    bind: {
                        value: '{rec.instruction}'
                    }
                },
                {
                    fieldLabel: '评分',
                    xtype: 'numberfield',
                    maxValue: 100,
                    minValue: 0,
                    bind: {
                        value: '{rec.score}'
                    }
                },
                {
                    fieldLabel: '任务意见',
                    xtype: 'textarea',
                    bind: {
                        value: '{rec.advice}'
                    }
                }
            ]
        }
    ],
    buttons: [
        {
            text: '关闭',
            glyph: 'xf00d@FontAwesome',
            handler: function () {
                this.up('window').close();
            }
        }
    ]
});