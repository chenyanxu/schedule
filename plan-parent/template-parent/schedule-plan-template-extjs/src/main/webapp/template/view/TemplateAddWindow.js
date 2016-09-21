/**
 * 任务模板新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.view.TemplateAddWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController'
    ],
    alias: 'widget.templateAddWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "templateAddWindow",
    width: 400,
    //todo 在此修改表单
    items: [
        {
            //xtype: 'baseForm',
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