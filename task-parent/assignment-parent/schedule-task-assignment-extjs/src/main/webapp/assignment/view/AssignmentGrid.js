/**
 * 布置任务表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.task.assignment.view.AssignmentGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.task.assignment.controller.AssignmentGridController',
        'kalix.task.assignment.store.AssignmentStore',
        'kalix.schedule.scheduleDict.component.ScheduleDictGridColumn'
    ],
    alias: 'widget.assignmentGrid',
    xtype: 'assignmentGridPanel',
    controller: {
        type: 'assignmentGridController',
        cfgForm: 'kalix.task.assignment.view.AssignmentWindow',
        cfgViewForm: 'kalix.task.assignment.view.AssignmentViewWindow',
        cfgModel: 'kalix.task.assignment.model.AssignmentModel'
    },
    store: {
        type: 'assignmentStore'
    },

    //todo 在此修改grid显示列
    //columns: {
    //    defaults: {flex: 1, renderer: 'addTooltip'},
        columns: [
            {
                xtype: 'rownumberer'
            },
            {
                text: '编号',
                dataIndex: 'id',
                hidden: true
            },
            {
                text: '用户id',
                dataIndex: 'userId',
                hidden: true
            },
            {
                text: '用户名称',
                dataIndex: 'userName',
                hidden: true
            },
            {
                text: '部门id',
                dataIndex: 'orgId',
                hidden: true
            },
            {
                text: '部门代码',
                dataIndex: 'orgCode',
                hidden: true
            },
            {
                text: '部门名称',
                dataIndex: 'orgName',
                hidden: true
            },
            {
                text: '任务名称',
                xtype: 'templatecolumn',
                tpl: new Ext.XTemplate('<tpl>【{subTaskCount}】{title}</tpl>'),
                renderer:null
            },
            {
                text: '任务进度',
                dataIndex: 'percent',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'progressbarwidget',
                    textTpl: [
                        '{percent}%'
                    ]
                },
                renderer: null
            },
            {
                text: '任务状态',
                xtype: 'scheduleDictGridColumn',
                dictType: '任务状态',
                dataIndex: 'state',
                renderer: null
            },
            {
                text: '完成分数',
                dataIndex: 'score'
            },
            {
                text: '布置人',
                dataIndex: 'createBy'
            },
            {
                text: '负责人',
                dataIndex: 'header'
            },
            {
                text: '任务来源',
                xtype: 'scheduleDictGridColumn',
                dictType: '任务来源',
                dataIndex: 'sourceType',
                hidden: true
            },
            {
                text: '来源于',
                dataIndex: 'sourcePlanId',
                hidden: true
            },
            {
                text: '来源于',
                dataIndex: 'sourceTaskId',
                hidden: true
            },
            {
                text: '开始日期',
                dataIndex: 'beginDate',
                xtype: 'datecolumn',
                format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
                renderer: null
            },
            {
                text: '结束日期',
                dataIndex: 'endDate',
                xtype: 'datecolumn',
                format: 'Y-m-d',             formatText:'格式为YYYY-mm-dd',
                renderer: null
            },
            {
                header: '常规操作',
                xtype: 'securityGridColumnCommon',
                //todo change permission
                verifyItems: [
                    {
                        tooltip: '查看',
                        permission: 'view',
                        iconCls: 'iconfont icon-view-column',
                        handler: 'onView'
                    },
                    {
                        tooltip: '编辑',
                        permission: 'edit',
                        handler: 'onEdit',
                        getClass: function (v, meta, record) {
                            if (Ext.util.Cookies.get('currentUserId') == record.data.userId){
                                if(record.data.state < 4) {
                                    return 'iconfont icon-edit-column';
                                }else{
                                    return 'kalix_hidden';
                                }
                            }
                            return 'kalix_hidden';
                        }
                    },
                    {
                        tooltip: '删除',
                        permission: 'delete',
                        handler: 'onDelete',
                        getClass: function (v, meta, record) {
                            //如果当前登录用户是任务的创建人
                            if (Ext.util.Cookies.get('currentUserId') == record.data.userId){
                                //如果任务是等待接收的状态，那么允许删除
                                if(record.data.state == 0) {
                                    return 'iconfont icon-delete';
                                }else{
                                    'kalix_hidden';
                                }
                            }

                            return 'kalix_hidden';
                        }
                    },
                    {
                        tooltip: '附件管理',
                        permission: 'attachement',
                        handler: 'onAttachmentManage',
                        getClass: function (v, meta, record) {
                            //如果当前登录用户是任务的创建人,则允许上传附件
                            if (Ext.util.Cookies.get('currentUserId') == record.data.head) {
                                return 'iconfont icon-attachment-column';
                            }
                            //如果当前登录用户是任务的负责人,则允许上传附件
                            if (Ext.util.Cookies.get('currentUserId') == record.data.head) {
                                return 'iconfont icon-attachment-column';
                            }

                            //需求说参与人也可以上传附件啦
                            return 'iconfont icon-attachment-column';

                            //return 'kalix_hidden';
                        }
                    }
                ]
            },
            {
                header: '业务操作',
                xtype: 'securityGridColumnCommon',
                //todo change permission
                verifyItems: [
                    {
                        tooltip: '修改负责人',
                        permission: 'header',
                        handler: 'onHeader',
                        getClass: function (v, meta, record) {
                            //如果当前登录用户是任务的创建人,那么可以修改任务的负责人
                            if (Ext.util.Cookies.get('currentUserId') == record.data.userId) {
                                if(record.data.state < 4) {
                                    return 'iconfont icon-schedule-task-head';
                                }else{
                                    return 'kalix_hidden';
                                }
                            }
                            return 'kalix_hidden';
                        }
                    },
                    {
                        tooltip: '撤销',
                        permission: 'cancel',
                        handler: 'onCancel',
                        getClass: function (v, meta, record) {
                            //如果当前登录用户是任务的创建人,那么可以撤销任务
                            if (Ext.util.Cookies.get('currentUserId') == record.data.userId) {
                                if(record.data.state < 4) {
                                    return 'iconfont icon-schedule-task-cancel';
                                }else{
                                    return 'kalix_hidden';
                                }
                            }
                            return 'kalix_hidden';
                        }
                    },
                    {
                        tooltip: '督办',
                        permission: 'supervise',
                        handler: 'onSupervise',
                        getClass: function (v, meta, record) {
                            //如果当前登录用户是任务的创建人,那么可以督办任务
                            //特别注意的，暂时不放开督办功能，因为没有任务的审批人
                            if (Ext.util.Cookies.get('currentUserId') == record.data.userId) {
                                if(record.data.state == 2) {
                                    return 'iconfont icon-schedule-task-supervise';
                                }else{
                                    return 'kalix_hidden';
                                }
                            }
                            return 'kalix_hidden';
                        }
                    },
                    {
                        tooltip: '延期',
                        permission: 'delay',
                        handler: 'onDelay',
                        getClass: function (v, meta, record) {
                            //如果当前登录用户是任务的创建人,那么可以延期任务
                            if (Ext.util.Cookies.get('currentUserId') == record.data.userId) {
                                if(record.data.state == 2) {
                                    return 'iconfont icon-schedule-task-delay';
                                }else{
                                    return 'kalix_hidden';
                                }
                            }
                            return 'kalix_hidden';
                        }
                    },
                    {
                        tooltip: '失败',
                        permission: 'failure',
                        handler: 'onFailure',
                        getClass: function (v, meta, record) {
                            //如果当前登录用户是任务的创建人,那么可以失败任务
                            if (Ext.util.Cookies.get('currentUserId') == record.data.userId) {
                                if(record.data.state < 4) {
                                    return 'iconfont icon-schedule-task-failure';
                                }else{
                                    return 'kalix_hidden';
                                }
                            }
                            return 'kalix_hidden';
                        }
                    },
                    {
                        tooltip: '汇报进度',
                        iconCls: 'iconfont icon-attachment-column',
                        permission: 'progress',
                        handler: 'onProgress',
                        getClass: function (v, meta, record) {
                            //如果当前登录用户是任务的负责人,那么可以汇报进度
                            if (Ext.util.Cookies.get('currentUserId') == record.data.head) {
                                if(record.data.state == 2) {
                                    return 'iconfont icon-schedule-task-progress';
                                }else{
                                    return 'kalix_hidden';
                                }
                            }
                            return 'kalix_hidden';
                        }
                    },
                    {
                        tooltip: '申请完成',
                        permission: 'complete',
                        handler: 'onComplete',
                        getClass: function (v, meta, record) {
                            //如果当前登录用户是任务的负责人,那么可以申请任务完成
                            if (Ext.util.Cookies.get('currentUserId') == record.data.head) {
                                if(record.data.state == 2) {
                                    return 'iconfont icon-schedule-task-complete';
                                }else{
                                    return 'kalix_hidden';
                                }
                            }
                            return 'kalix_hidden';
                        }
                    },
                    {
                        tooltip: '审批任务完成',
                        permission: 'finish',
                        handler: 'onFinish',
                        getClass: function (v, meta, record) {
                            //如果当前登录用户是任务的创建人,那么可以审批任务完成
                            if (Ext.util.Cookies.get('currentUserId') == record.data.userId) {
                                if(record.data.state == 3) {
                                    return 'iconfont icon-schedule-task-complete';
                                }else{
                                    return 'kalix_hidden';
                                }
                            }
                            return 'kalix_hidden';
                        }
                    }
                ]
            }
        ],
    //},
    tbar: {
        xtype: 'securityToolbar',
        verifyItems: [
            {
                text: '添加',
                xtype: 'button',
                iconCls: 'iconfont icon-add',
                permission: 'add',
                handler: 'onAdd'
            }
        ]
    }
});
