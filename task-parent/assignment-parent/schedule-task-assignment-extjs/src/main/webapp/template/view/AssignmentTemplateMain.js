/**
 * 任务模板首页
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.view.AssignmentTemplateMain', {
    extend: 'Ext.window.Window',
    requires: [
        'kalix.schedule.template.view.AssignmentTemplateGrid'
    ],
    title: '计划模板下的任务',
    items: [
        {
            xtype: 'assignmentTemplateGridPanel',
            id: 'assignmentTemplateGridPanel',
            height: 400,
            width:600
        }
    ]
});
