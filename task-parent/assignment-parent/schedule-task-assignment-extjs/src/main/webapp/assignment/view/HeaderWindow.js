/**
 * 修改任务负责人添加和修改表单
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
                    },
                    listeners: {
                        'change': function (e, t, options) {
                            if (e.displayTplData.length != 0) {
                                this.lookupViewModel().get('rec').set('header', e.displayTplData[0].name);
                            }
                        }
                    }
                },
                {
                    fieldLabel: '选择负责人',
                    hidden: true,
                    bind: {
                        value: '{rec.header}'
                    }
                }
            ]
        }
    ],
    buttons: [
        {
            text: '保存',
            iconCls: 'iconfont icon-save iconfont-btn-small',
            handler: 'onSave',
            bind: {
                hidden: '{view_operation}'
            }
        },
        {
            text: '取消',
            glyph: 'xf00d@FontAwesome',
            handler: function () {
                this.up('window').close();
            }
        }
    ]
})
;