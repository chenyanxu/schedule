/**
 * 修改任务负责人添加和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.CompleteWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.task.assignment.controller.CompleteWindowController'
    ],
    alias: 'widget.completeWindow',
    xtype: 'completeWindow',
    controller: {
        type: 'completeWindowController'
    },
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
    ],
    buttons: [
        {
            text: '继续修改',
            iconCls: 'iconfont icon-edit-column',
            handler: 'onContinute'
        },
        {
            text: '任务完成',
            iconCls: 'iconfont icon-schedule-task-complete',
            handler: 'onFinish'
        },
        {
            text: '任务失败',
            iconCls: 'iconfont icon-schedule-task-failure',
            handler: 'onFailure'
        }
    ]
})
;