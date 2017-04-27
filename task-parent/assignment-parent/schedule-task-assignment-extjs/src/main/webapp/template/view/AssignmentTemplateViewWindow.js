/**
 * 任务模板查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.schedule.template.view.AssignmentTemplateViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox',
        'kalix.admin.user.component.UserComboBox',
        'kalix.admin.user.component.UserOrgComboBox',
        'kalix.admin.user.component.UserTagField'
    ],
    alias: 'widget.assignmentTemplateViewWindow',
    xtype: 'assignmentTemplateViewWindow',
    width: 800,
    //todo 在此修改查看字段
    items: [
        {
            defaults: {readOnly: true},
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
                    }
                },
                {
                    fieldLabel: '来源于',
                    allowBlank: false,
                    id: 'assignmentTemplateView_sourceId',
                    xtype: 'combo',
                    valueField: 'id',
                    displayField: 'title',
                    queryParam: 'title',
                    modelField:'id',
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
                {
                    fieldLabel: '评估工时',
                    allowBlank: false,
                    bind: {
                        value: '{rec.workHours}'
                    }
                }
            ]
        },
        {
            defaults: {readOnly: true},
            xtype: 'baseForm',
            items: [
                {
                    fieldLabel: '负责人',
                    allowBlank: false,
                    xtype: 'userCombobox',
                    valueField: 'id',
                    displayField: 'name',
                    bind: {
                        value: '{rec.head}'
                    }
                },
                {
                    fieldLabel: '参与人',
                    xtype: 'userTagField',
                    valueField: 'id',
                    displayField: 'name',
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
});