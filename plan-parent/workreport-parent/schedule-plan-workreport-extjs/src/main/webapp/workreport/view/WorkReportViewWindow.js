/**
 * 工作汇报查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.plan.workreport.view.WorkReportViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.schedule.scheduleDict.component.ScheduleDictCombobox'
    ],
    alias: 'widget.workreportViewWindow',
    xtype: "workreportViewWindow",
    width: 800,
    planTitle: 'test',
    //todo 在此修改查看字段
    items: [
        {
            defaults: {readOnly: true},
            xtype: 'baseForm',
            items: [
                {
                    fieldLabel: '用户id',
                    hidden: true,
                    bind: {
                        value: '{rec.userId}'
                    }
                },
                {
                    fieldLabel: '用户名称',
                    bind: {
                        value: '{rec.userName}'
                    }
                },
                {
                    fieldLabel: '部门id',
                    hidden: true,
                    bind: {
                        value: '{rec.orgId}'
                    }
                },
                {
                    fieldLabel: '部门code',
                    hidden: true,
                    bind: {
                        value: '{rec.orgCode}'
                    }
                },
                {
                    fieldLabel: '部门名称',
                    bind: {
                        value: '{rec.orgName}'
                    }
                },
                {
                    fieldLabel: '汇报类型',
                    xtype: 'scheduleDictCombobox',
                    dictType: '汇报类型',
                    bind: {
                        value: '{rec.workType}'
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
                    fieldLabel: '计划类型',
                    hidden: true,
                    bind: {
                        value: '{rec.planType}'
                    },
                    listeners: {
                        'render': function(target) {
                            var sourceType = this.lookupViewModel().get('rec').get('planType');

                            var store;

                            if (sourceType == 1) {
                                store = Ext.create("kalix.plan.personalplan.store.PersonalPlanStore");
                            }
                            else if (sourceType == 2) {
                                store = Ext.create("kalix.plan.departmentplan.store.DepartmentPlanStore");
                            }

                            if (store != null) {
                                var id = this.lookupViewModel().get('rec').get('planId');
                                if (id != null && id != '') {
                                    store.setProxy({
                                        type: 'ajax',
                                        url: store.proxyUrl + '/' + id
                                    });

                                    store.load({
                                        'callback': function (records, options, success) {
                                            Ext.getCmp('workReportPlanTitle').setValue(records[0].data.title);
                                            Ext.getCmp('workReportPlanContent').setValue(records[0].data.content);
                                        }
                                    });
                                }
                            }
                        }
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
        },
        {
            defaults: {readOnly: true},
            items: [
                {
                    fieldLabel: '关联计划',
                    id: 'workReportPlanTitle'
                },
                {
                    fieldLabel: '计划内容',
                    xtype: 'textarea',
                    id: 'workReportPlanContent'
                }
            ]
        }
    ]

});