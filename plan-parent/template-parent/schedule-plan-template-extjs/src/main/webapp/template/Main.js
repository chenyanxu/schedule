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
        'kalix.schedule.template.view.TemplateSearchForm'
    ],
    items: [
        {
            title: '任务模板查询',
            xtype: 'templateSearchForm'
        },
        {
            xtype: 'templateGridPanel',
            id: 'templateGridPanel',
            title: '任务模板列表',
            margin: 10
        }
    ]
});
