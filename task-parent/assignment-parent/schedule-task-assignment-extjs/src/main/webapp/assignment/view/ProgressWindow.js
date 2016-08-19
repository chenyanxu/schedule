/**
 * 修改任务负责人新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.ProgressWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController'
    ],
    alias: 'widget.progressWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "progressWindow",
    width: 400,
    //todo 在此修改表单
    items: [
        {
            xtype: 'baseForm',
            items: [
                {
                    fieldLabel: '任务进度',
                    allowBlank: false,
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
        }
    ]
})
;