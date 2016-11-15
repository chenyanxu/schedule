/**
 * 项目选择下拉comboBox
 * @author zangyanming
 */
Ext.define('kalix.plan.departmentplan.component.DepartmentPlanComboBox', {
    extend: 'kalix.view.components.common.BaseComboBox',
    requires: [
        'kalix.plan.departmentplan.store.DepartmentPlanStore'
    ],
    alias: 'widget.departmentPlanComboBox',
    xtype: 'departmentPlanComboBox',
    valueField: 'id',
    displayField: 'title',
    queryParam: '%title%',
    modelField:'id',
    store: {
        type: 'departmentplanStore'
    },
    getParams: function (queryString) {
        var params = {},
            param = this.queryParam;

        if (param) {
            params[param] = '{"%' + this.displayField + '%":"' + queryString + '"}';
        }

        return params;
    }
});
