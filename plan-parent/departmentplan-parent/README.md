# departmentplan-parent

## 部门计划管理
  * api：后台的service和dao的接口
  * biz：后台service接口的实现
  * dao：后台dao接口的实现
  * entities：javaBean实体类
  * extjs：前台增删改查界面的展示
  * rest：前台到后台的rest服务配置

## 使用
引用该模块所生成的osgi jar包，在schedule-parent/core-parent/schedule-core-etc配置文件ConfigScheduleApp.cfg中增加菜单配置的相关配置。

## 注意事项
 查询个人的部门计划时，需要获取登录用户的userId

        //查询json串中添加，当前操作人员id
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        jsonMap.put("userId", String.valueOf(this.getShiroService().getCurrentUserId()));