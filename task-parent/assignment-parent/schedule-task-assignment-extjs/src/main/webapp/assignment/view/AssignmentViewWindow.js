/**
 * 布置任务查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.task.assignment.view.AssignmentViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    alias: 'widget.assignmentViewWindow',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.plan.departmentplan.component.DepartmentPlanComboBox',
        'kalix.task.assignment.component.AssignmentComboBox'
    ],
    xtype: "assignmentViewWindow",
    width: 800,
    //todo 在此修改查看字段
    items: [
        {
            defaults: {readOnly: true},
            //xtype: 'baseForm',
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
                    fieldLabel: '部门id',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.departmentId}'
                    }
                },
                {
                    fieldLabel: '部门名',
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
                    }
                },
                //{
                //    fieldLabel: '来源于',
                //    xtype: 'departmentPlanComboBox',
                //    allowBlank: false,
                //    bind: {
                //        value: '{rec.sourceId}'
                //    }
                //},
                {
                    fieldLabel: '来源于',
                    xtype: 'assignmentComboBox',
                    allowBlank: false,
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
                }
            ]
        },
        {
            defaults: {readOnly: true},
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
                        value: '{rec.head}'
                    }
                },
                {
                    fieldLabel: '参与人',
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
                }
            ]
        }
    ]
});