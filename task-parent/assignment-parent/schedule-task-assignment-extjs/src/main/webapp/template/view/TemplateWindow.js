/**
 * 任务模板新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.view.TemplateWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.admin.user.component.UserOrgComboBox',
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    alias: 'widget.templateWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: 'templateWindow',
    width: 400,
    //todo 在此修改表单
    items: [
        {
            xtype: 'baseForm',
            items: [
                {
                    fieldLabel: '模板名称',
                    allowBlank: false,
                    bind: {
                        value: '{rec.templateName}'
                    }
                },
                {
                    fieldLabel: '部门名称',
                    beforeLabelTextTpl: '<span class="field-required" data-qtip="必填选项">*</span>',
                    xtype: 'userOrgComboBox',
                    allowBlank: false,
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 450,
                    margin: '10 5 5 5',
                    bind: {
                        value: '{rec.orgId}'
                    }
                },
                {
                    fieldLabel: '用户ID',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.userId}'
                    }
                },
                {
                    fieldLabel: '用户姓名',
                    hidden: true,
                    allowBlank: false,
                    bind: {
                        value: '{rec.userName}'
                    }
                },
                {
                    fieldLabel: '组织机构ID',
                    hidden: true,
                    allowBlank: false,
                    bind: {
                        value: '{rec.orgId}'
                    }
                },
                {
                    fieldLabel: '组织机构编码',
                    hidden: true,
                    allowBlank: false,
                    bind: {
                        value: '{rec.orgCode}'
                    }
                },
                {
                    fieldLabel: '组织机构名称',
                    hidden: true,
                    allowBlank: false,
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
                    bind: {
                        value: '{rec.content}'
                    }
                },
                {
                    fieldLabel: '计划类型',
                    xtype: 'scheduleDictCombobox',
                    dictType: '部门计划类型',
                    allowBlank: false,
                    bind: {
                        value: '{rec.planType}'
                    },
                    renderer: null
                },
                {
                    fieldLabel: '计划天数',
                    allowBlank: false,
                    bind: {
                        value: '{rec.planDate}'
                    }
                },
                {
                    fieldLabel: '计划状态',
                    xtype: 'scheduleDictCombobox',
                    dictType: '部门计划状态',
                    allowBlank: false,
                    bind: {
                        value: '{rec.state}'
                    },
                    renderer: null
                },
                {
                    fieldLabel: '任务ID',
                    hidden: true,
                    allowBlank: false,
                    bind: {
                        value: '{rec.taskIds}'
                    }
                }
            ]
        }
    ]
});