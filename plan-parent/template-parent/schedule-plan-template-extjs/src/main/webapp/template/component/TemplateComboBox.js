/**
 * 项目选择下拉comboBox
 * @author zangyanming
 */
Ext.define('kalix.schedule.template.component.TemplateComboBox', {
    extend: 'kalix.view.components.common.BaseComboBox',
    requires: [
        'kalix.schedule.template.store.TemplateStore'
    ],
    alias: 'widget.templateComboBox',
    xtype: 'templateComboBox',
    valueField: 'id',
    displayField: 'title',
    queryParam: 'title',
    modelField:'id',
    store: {
        type: 'templateStore'
    }
});
