/**
 * 部门计划查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.plan.departmentplan.view.DepartmentPlanViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    alias: 'widget.departmentplanViewWindow',
    xtype: "departmentplanViewWindow",
    requires: [
        'kalix.plan.workreport.view.WorkReportViewGrid',
        'kalix.task.assignment.view.DepartmentTaskGrid'
    ],
    width: 700,
    height: 600,
    items: [
        {
            xtype: 'tabpanel',
            id: 'departmentPlanTaskTabPanel',
            items: [
                {
                    title: '基本信息',
                    xtype: 'panel',
                    align: 'center',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {width: 700},
                    items: [
                        {
                            defaults: {readOnly: true},
                            xtype: 'baseForm',
                            items: [
                                {
                                    fieldLabel: 'id',
                                    hidden: true,
                                    bind: {
                                        value: '{rec.id}'
                                    }
                                },
                                {
                                    fieldLabel: '用户名',
                                    bind: {
                                        value: '{rec.userName}'
                                    }
                                },
                                {
                                    fieldLabel: '部门名称',
                                    bind: {
                                        value: '{rec.orgName}'
                                    }
                                },
                                {
                                    fieldLabel: '计划类型',
                                    xtype: 'scheduleDictCombobox',
                                    dictType: '部门计划类型',
                                    bind: {
                                        value: '{rec.planType}'
                                    }
                                },
                                {
                                    fieldLabel: '计划状态',
                                    xtype: 'scheduleDictCombobox',
                                    dictType: '部门计划状态',
                                    bind: {
                                        value: '{rec.state}'
                                    }
                                },
                                {
                                    fieldLabel: '开始日期',
                                    xtype: 'datefield',
                                    format: 'Y-m-d',
                                    bind: {
                                        value: '{rec.beginDate}'
                                    }
                                },
                                {
                                    fieldLabel: '结束日期',
                                    xtype: 'datefield',
                                    format: 'Y-m-d',
                                    bind: {
                                        value: '{rec.endDate}'
                                    }
                                },
                                {
                                    fieldLabel: '标题',
                                    bind: {
                                        value: '{rec.title}'
                                    }
                                },
                                {
                                    fieldLabel: '内容',
                                    xtype: 'textarea',
                                    bind: {
                                        value: '{rec.content}'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'workreportviewGridPanel',
                    title: '工作汇报列表',
                    margin: 10,
                    bind: {
                        planId: '{rec.id}'
                    }
                },
                {
                    xtype: 'departmentTaskGridPanel',
                    id: 'departmentTaskGridPanel',
                    title: '任务列表',
                    margin: 10,
                    listeners: {
                        'activate': function (target, eOpts) {
                            var departmentPlanId = Ext.getCmp('departmentPlanTaskTabPanel').items.items[0].items.items[0].items.items[0].value;
                            var jsonStr = {
                                'sourceId':departmentPlanId
                            };
                            jsonStr = Ext.JSON.encode(jsonStr);
                            Ext.getCmp("departmentTaskGridPanel").store.proxy.url = '/kalix/camel/rest/assignments/' + departmentPlanId + '/tasks';
                            Ext.getCmp("departmentTaskGridPanel").store.proxy.extraParams = {'jsonStr':jsonStr};
                            Ext.getCmp("departmentTaskGridPanel").store.load();
                        }
                    }
                }
            ]
        }
    ]
});