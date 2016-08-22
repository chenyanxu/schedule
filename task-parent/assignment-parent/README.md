# assignment-parent

## 任务分配
  * api：后台的service和dao的接口
  * biz：后台service接口的实现
  * dao：后台dao接口的实现
  * entities：javaBean实体类
  * extjs：前台增删改查界面的展示
  * rest：前台到后台的rest服务配置

## 使用
引用该模块所生成的osgi jar包，在schedule-parent/core-parent/schedule-core-etc配置文件ConfigScheduleApp.cfg中增加菜单配置的相关配置。

## 注意事项
  * 任务中的状态及任务中的人员
    * 任务的状态
      * 0 等待接受,此状态可以跳转到进行中、拒绝接受和任务失败
      * 1 拒绝接受,此状态可以跳转到任务失败和任务已撤销
      * 2 进行中,此状态可以跳转到提交审核、任务失败和任务已撤销
      * 3 提交审核,此状态可以跳转到进行中、任务已失败和任务完成
      * 4 任务完成,终态
      * 5 任务已失败,终态
      * 6 任务已撤销,终态

    * 任务中的人员
      * 1 布置人 负责任务的增删改查、撤销、延期、失败、完成任务审批等
      * 2 负责人 负责任务的接受任务、拒绝接受、上传文档、汇报进度，申请完成任务等。
      * 3 参与人 只有查看权限

  * 查找任务时，需要根据任务的布置人，负责人以及参与人进行查询

        //获取登录用户的id及名称
        Long userId = this.getShiroService().getCurrentUserId();
        String userName = this.getShiroService().getCurrentUserRealName();

  * List去重方法

        List totalList = new ArrayList<>();
        totalList.addAll(creationList);
        //去重复数据
        totalList.removeAll(headList);
        totalList.addAll(headList);
