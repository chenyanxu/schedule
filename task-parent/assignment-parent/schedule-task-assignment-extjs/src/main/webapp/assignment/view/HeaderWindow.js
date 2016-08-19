/**
 * 修改任务负责人新增和修改表单
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.HeaderWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.admin.user.component.UserComboBox'
    ],
    alias: 'widget.headerWindow',
    controller: {
        type: 'baseWindowController'
    },
    xtype: "headerWindow",
    width: 400,
    //todo 在此修改表单
    items: [
        {
            xtype: 'baseForm',
            items: [
                {
                    fieldLabel: '选择负责人',
                    xtype: 'userCombobox',
                    valueField: 'id',
                    displayField: 'name',
                    //queryParam: 'jsonStr',
                    allowBlank: false,
                    bind: {
                        value: '{rec.head}'
                    }
                }
            ]
        }
    ]
})
;