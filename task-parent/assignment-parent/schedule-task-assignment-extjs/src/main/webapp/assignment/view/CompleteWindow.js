/**
 * 修改任务负责人新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.CompleteWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController'
    ],
    alias: 'widget.completeWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "completeWindow",
    width: 400,
    //todo 在此修改表单
    items: [
        {
            xtype: 'baseForm',
            items: [
                {
                    fieldLabel: '任务状态',
                    hidden: true,
                    bind: {
                        value: '{rec.score}'
                    }
                },
                {
                    fieldLabel: '任务评分',
                    emptyText: '0-100',
                    allowBlank: false,
                    bind: {
                        value: '{rec.score}'
                    }
                },
                {
                    fieldLabel: '任务意见',
                    xtype: 'textarea',
                    allowBlank: false,
                    bind: {
                        value: '{rec.advice}'
                    }
                }
            ]
        }
    ]
})
;