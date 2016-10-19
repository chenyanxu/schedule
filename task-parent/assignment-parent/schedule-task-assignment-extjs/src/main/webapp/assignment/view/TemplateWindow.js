/**
 * 布置任务添加和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.TemplateWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.schedule.template.component.TemplateComboBox'
    ],
    alias: 'widget.templateWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "templateWindow",
    width: 400,
    //todo 在此修改表单
    items: [
        {
            items: [
                {
                    fieldLabel: '模板名称',
                    xtype: 'templateComboBox',
                    allowBlank: false,
                    bind: {
                        value: '{rec.templateId}'
                    }
                }
            ]
        }
    ]
})
;