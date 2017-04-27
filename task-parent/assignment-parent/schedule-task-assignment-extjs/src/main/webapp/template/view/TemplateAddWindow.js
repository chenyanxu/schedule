/**
 * 任务模板新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.view.TemplateAddWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.schedule.template.controller.TemplateAddWindowController'
    ],
    alias: 'widget.templateAddWindow',
    controller: {
        type: 'templateAddWindowController'
    },
    xtype: 'templateAddWindow',
    width: 400,
    //todo 在此修改表单
    items: [
        {
            items: [
                {
                    fieldLabel: '模板名称',
                    allowBlank: false,
                    bind: {
                        value: '{rec.templateName}'
                    }
                },
                {
                    fieldLabel: '部门计划ID',
                    hidden: true,
                    bind: {
                        value: '{rec.departmentplanId}'
                    }
                }
            ]
        }
    ]
});