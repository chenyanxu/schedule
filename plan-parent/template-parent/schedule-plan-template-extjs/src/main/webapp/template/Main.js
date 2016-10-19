/**
 * 任务模板首页
 *
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.schedule.template.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.schedule.template.view.TemplateGrid',
        'kalix.schedule.template.view.AssignmentTemplateGrid',
        'kalix.schedule.template.view.TemplateSearchForm',
        'kalix.schedule.template.controller.TemplateMainController'
    ],
    xtype: 'assignmentTemplateMainPanel',
    controller: 'templateMainController',
    layout: 'hbox',
    border: 0,
    margin:'5 0 0 0',
    items: [
        {
            items:[
                {
                    title: '计划模板查询',
                    xtype: 'templateSearchForm',
                    width: 460
                },
                {
                    xtype: 'templateGridPanel',
                    width:460,
                    id: 'templateGridPanel',
                    title: '计划模板列表',
                    listeners: {
                        itemclick: 'onItemClick'
                    }
                }
            ]
        },
        {
            xtype:'assignmentTemplateGridPanel',
            id: 'assignmentTemplateGridPanel',
            title: '任务模板',
            flex: 1
        }
    ]
});
