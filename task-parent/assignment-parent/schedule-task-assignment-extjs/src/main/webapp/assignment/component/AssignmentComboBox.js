/**
 * 项目选择下拉comboBox
 * @author zangyanming
 */
Ext.define('kalix.task.assignment.component.AssignmentComboBox', {
    extend: 'kalix.view.components.common.BaseComboBox',
    requires: [
        'kalix.task.assignment.store.AssignmentStore'
    ],
    alias: 'widget.assignmentComboBox',
    xtype: 'assignmentComboBox',
    valueField: 'id',
    displayField: 'title',
    queryParam: 'title',
    modelField:'id',
    store: {
        type: 'assignmentStore'
    }
});
