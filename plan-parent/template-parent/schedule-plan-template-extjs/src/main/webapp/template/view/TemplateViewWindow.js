/**
 * 任务模板查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.schedule.template.view.TemplateViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    alias: 'widget.templateViewWindow',
    xtype: 'templateViewWindow',
    width: 400,
    //todo 在此修改查看字段
    items: [
        {
            defaults: {readOnly: true},
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
                    allowBlank: false,
                    xtype: 'scheduleDictCombobox',
                    dictType: '部门计划类型',
                    bind: {
                        value: '{rec.planType}'
                    }
                },
                {
                    fieldLabel: '计划天数',
                    allowBlank: false,
                    xtype: 'numberfield',
                    bind: {
                        value: '{rec.planDate}'
                    }
                },
                {
                    fieldLabel: '计划状态',
                    allowBlank: false,
                    xtype: 'scheduleDictCombobox',
                    dictType: '部门计划状态',
                    bind: {
                        value: '{rec.state}'
                    }
                },
                {
                    fieldLabel: '任务ID',
                    allowBlank: false,
                    hidden: true,
                    bind: {
                        value: '{rec.taskIds}'
                    }
                }
            ]
        }
    ]
});