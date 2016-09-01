/**
 * 个人计划查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.plan.personalplan.view.PersonalPlanViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    alias: 'widget.personalplanViewWindow',
    xtype: "personalplanViewWindow",
    requires: [
        'kalix.plan.workreport.view.WorkReportViewGrid'
    ],
    width: 600,
    //todo 在此修改查看字段
    listeners:{
        render:function(){
        //    var planId = this.lookupViewModel().get('rec').id;
        //    var gridConfig={
        //        xtype: 'workreportviewGridPanel',
        //        title: '工作汇报列表',
        //        margin: 10,
        //        planId: planId
        //    };
        //
        //    this.items.getAt(0).add(gridConfig);
        }
    },
    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    title: '基本资料',
                    xtype: 'panel',
                    align: 'center',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {width: 600},
                    items: [
                        {
                            defaults: {readOnly: true},
                            xtype: 'baseForm',
                            items: [
                                {
                                    fieldLabel: '用户id',
                                    allowBlank: false,
                                    hidden: true,
                                    bind: {
                                        value: '{rec.userId}'
                                    }
                                },
                                {
                                    fieldLabel: '用户名',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.userName}'
                                    }
                                },
                                {
                                    fieldLabel: '部门id',
                                    allowBlank: false,
                                    hidden: true,
                                    bind: {
                                        value: '{rec.orgId}'
                                    }
                                },
                                {
                                    fieldLabel: '部门code',
                                    allowBlank: false,
                                    hidden: true,
                                    bind: {
                                        value: '{rec.orgCode}'
                                    }
                                },
                                {
                                    fieldLabel: '部门名称',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.orgName}'
                                    }
                                },
                                {
                                    fieldLabel: '计划类型',
                                    xtype: 'scheduleDictCombobox',
                                    dictType: '个人计划类型',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.planType}'
                                    }
                                },
                                {
                                    fieldLabel: '计划状态',
                                    xtype: 'scheduleDictCombobox',
                                    dictType: '个人计划状态',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.state}'
                                    }
                                },
                                {
                                    fieldLabel: '开始日期',
                                    allowBlank: false,
                                    xtype: 'datefield',
                                    format: 'Y-m-d',
                                    bind: {
                                        value: '{rec.beginDate}'
                                    }
                                },
                                {
                                    fieldLabel: '结束日期',
                                    allowBlank: false,
                                    xtype: 'datefield',
                                    format: 'Y-m-d',
                                    bind: {
                                        value: '{rec.endDate}'
                                    }
                                },
                                {
                                    fieldLabel: '标题',
                                    allowBlank: false,
                                    bind: {
                                        value: '{rec.title}'
                                    }
                                },
                                {
                                    fieldLabel: '内容',
                                    allowBlank: false,
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
                }
            ]
        }
    ]
});