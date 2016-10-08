/**
 * 任务模板查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.view.AssignmentTemplateSearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    alias: 'widget.assignmentTemplateSearchForm',
    xtype: 'assignmentTemplateSearchForm',
    storeId: 'assignmentTemplateStore',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '计划模板ID',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'planTemplateId'
        }
    ]
});
