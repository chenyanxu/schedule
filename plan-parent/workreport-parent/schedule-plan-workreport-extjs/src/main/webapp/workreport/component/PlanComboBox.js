/**
 * 项目选择下拉comboBox
 * @author zangyanming
 */
Ext.define('kalix.plan.workreport.component.PlanComboBox', {
    extend: 'kalix.view.components.common.BaseComboBox',
    alias: 'widget.planComboBox',
    xtype: 'planComboBox',
    valueField: 'id',
    displayField: 'title',
    queryParam: 'title',
    modelField:'id',
    editable: false
});
