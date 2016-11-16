/**
 * 修改任务负责人添加和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.DelayWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController'
    ],
    alias: 'widget.delayWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "delayWindow",
    width: 400,
    //todo 在此修改表单
    items: [
        {
            xtype: 'baseForm',
            items: [
                {
                    fieldLabel: '完成日期',
                    allowBlank: false,
                    xtype: 'datefield',
                    format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',

                    bind: {
                        minValue: '{rec.endDate}',
                        value: '{rec.endDate}'
                    }
                }
            ]
        }
    ]
})
;