/**
 * 项目选择下拉comboBox
 * @author zangyanming
 */
Ext.define('kalix.plan.personalplan.component.PersonalPlanComboBox', {
    extend: 'kalix.view.components.common.BaseComboBox',
    requires: [
        'kalix.plan.personalplan.store.PersonalPlanStore'
    ],
    alias: 'widget.personalPlanComboBox',
    xtype: 'personalPlanComboBox',
    valueField: 'id',
    displayField: 'title',
    queryParam: 'title',
    modelField:'id',
    editable: false,
    store: {
        type: 'personalplanStore',
        autoLoad: true
    }
});
