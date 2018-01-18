package com.kalix.schedule.task.assignment.biz;

import com.kalix.admin.core.api.biz.IUserBeanService;
import com.kalix.admin.core.api.dao.IOrganizationBeanDao;
import com.kalix.admin.core.entities.OrganizationBean;
import com.kalix.framework.core.api.persistence.JsonData;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.api.web.model.BaseDTO;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.Assert;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.system.dict.api.biz.IScheduleDictBeanService;
import com.kalix.schedule.task.assignment.api.biz.IAssignmentStatisticsBeanService;
import com.kalix.schedule.task.assignment.api.dao.IAssignmentBeanDao;
import com.kalix.schedule.task.assignment.api.query.AssignmentColumnChartDTO;
import com.kalix.schedule.task.assignment.api.query.AssignmentDTO;
import com.kalix.schedule.task.assignment.api.query.AssignmentPieChartDTO;
import com.kalix.schedule.task.assignment.entities.AssignmentBean;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @类描述：
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class AssignmentStatisticsBeanServiceImpl extends ShiroGenericBizServiceImpl<IAssignmentBeanDao, AssignmentBean> implements IAssignmentStatisticsBeanService {
    private JsonStatus jsonStatus = new JsonStatus();
    private IUserBeanService userBeanService;

    public AssignmentStatisticsBeanServiceImpl() {
        super.init(AssignmentBean.class.getName());
    }

    private IScheduleDictBeanService scheduleDictBeanService;

    private IOrganizationBeanDao organizationBeanDao;


    private String[] getSqlWhere(String jsonStr) {
        String[] result = new String[2];
        Map<String, String> jsonMap = SerializeUtil.json2Map(jsonStr);
        String orgCode = "001";
        String condition = "";
        for (Map.Entry<String, String> entry : jsonMap.entrySet()) {
            if (entry.getValue() != null && !entry.getValue().equals("")) {
                //获取前台传入的orgCode
                if (entry.getKey().equals("orgCode")) {
                    orgCode = entry.getValue();
                    condition = condition + " and " + entry.getKey() + " like '" + entry.getValue() + "%'";
                } else if (entry.getKey().contains(":begin:gt")) {
                    if (entry.getValue() != null && !entry.getValue().equals("")) {
                        condition = condition + " and " + entry.getKey().split(":")[0] + " >= '" + entry.getValue() + "'";
                    }
                } else if (entry.getKey().contains(":begin:lt")) {
                    if (entry.getValue() != null && !entry.getValue().equals("")) {
                        condition = condition + " and " + entry.getKey().split(":")[0] + " <= '" + entry.getValue() + "'";
                    }
                } else if (entry.getKey().contains(":end:gt")) {
                    if (entry.getValue() != null && !entry.getValue().equals("")) {
                        condition = condition + " and " + entry.getKey().split(":")[0] + " >= '" + entry.getValue() + "'";
                    }
                } else if (entry.getKey().contains(":end:lt")) {
                    if (entry.getValue() != null && !entry.getValue().equals("")) {
                        condition = condition + " and " + entry.getKey().split(":")[0] + " <= '" + entry.getValue() + "'";
                    }
                } else {
                    condition = condition + " and " + entry.getKey() + " = " + entry.getValue();
                }
            }
        }

        result[0] = orgCode;
        result[1] = condition;
        return result;
    }

    @Override
    public JsonData getAllEntityByQuery(Integer page, Integer limit, String jsonStr) {
        JsonData jsonData = new JsonData();
        String[] result = getSqlWhere(jsonStr);
        String orgCode = result[0];
        String condition = result[1];

        //1、先查找该中心代码所直属的部门信息
        List<OrganizationBean> organizatioBeen = organizationBeanDao.find("select ob from OrganizationBean ob where ob.code like ?1 order by ob.name", orgCode + "___");

        //2、获得查询的sql语句
        String sql = getNativeQueryStr();

        //获得返回的结果类
        Class<? extends BaseDTO> cls = getResultClass();
        Assert.notNull(cls, "返回查询结果类不能为空.");

        //3、循环查找该中心代码下的任务数，放到assignmentList中
        List<AssignmentDTO> assignmentList = new ArrayList<>();
        for (int i = 0; i < organizatioBeen.size(); i++) {
            String tmpSql = sql + " where orgCode like '" + organizatioBeen.get(i).getCode() + "%' " + condition;
            List<AssignmentDTO> tmpList = dao.findByNativeSql(tmpSql, AssignmentDTO.class, "");
            //如果数据为空，那么初始为0
            AssignmentDTO tmpDTO = new AssignmentDTO();
            tmpDTO.setOrgName(organizatioBeen.get(i).getName());
            tmpDTO.setTotal(tmpList.get(0).getTotal());
            tmpDTO.setWaiting(tmpList.get(0).getWaiting() == null ? 0 : tmpList.get(0).getWaiting());
            tmpDTO.setReject(tmpList.get(0).getReject() == null ? 0 : tmpList.get(0).getReject());
            tmpDTO.setProcess(tmpList.get(0).getProcess() == null ? 0 : tmpList.get(0).getProcess());
            tmpDTO.setProcessDelay(tmpList.get(0).getProcessDelay() == null ? 0 : tmpList.get(0).getProcessDelay());
            tmpDTO.setComplete(tmpList.get(0).getComplete() == null ? 0 : tmpList.get(0).getComplete());
            tmpDTO.setFinish(tmpList.get(0).getFinish() == null ? 0 : tmpList.get(0).getFinish());
            tmpDTO.setFinishDelay(tmpList.get(0).getFinishDelay() == null ? 0 : tmpList.get(0).getFinishDelay());
            tmpDTO.setFailure(tmpList.get(0).getFailure() == null ? 0 : tmpList.get(0).getFailure());
            tmpDTO.setCancel(tmpList.get(0).getCancel() == null ? 0 : tmpList.get(0).getCancel());

            assignmentList.add(tmpDTO);
        }

        //4、查询该中心下的任务数
        String tmpSql = "select orgName,count(*) as total," +
                "sum(case when state=0 then 1 else 0 end) as waiting," +
                "sum(case when state=1 then 1 else 0 end) as reject," +
                "sum(case when state=2 then 1 else 0 end) as process," +
                "sum(case when state=2 and endDate < now() then 1 else 0 end) as processDelay," +
                "sum(case when state=3 then 1 else 0 end) as complete," +
                "sum(case when state=4 then 1 else 0 end) as finish," +
                "sum(case when state=4 and endDate < finishDate then 1 else 0 end) as finishDelay," +
                "sum(case when state=5 then 1 else 0 end) as failure," +
                "sum(case when state=6 then 1 else 0 end) as cancel " +
                "from " + dao.getTableName() +
                " where 1=1 and orgCode='" + orgCode+"'" + condition + " group by orgName";
        List<AssignmentDTO> tmpList = dao.findByNativeSql(tmpSql, AssignmentDTO.class, "");
        if (tmpList.size() != 0) {
            //如果数据为空，那么初始为0
            AssignmentDTO tmpDTO = new AssignmentDTO();
            tmpDTO.setOrgName(tmpList.get(0).getOrgName());
            tmpDTO.setTotal(tmpList.get(0).getTotal());
            tmpDTO.setWaiting(tmpList.get(0).getWaiting() == null ? 0 : tmpList.get(0).getWaiting());
            tmpDTO.setReject(tmpList.get(0).getReject() == null ? 0 : tmpList.get(0).getReject());
            tmpDTO.setProcess(tmpList.get(0).getProcess() == null ? 0 : tmpList.get(0).getProcess());
            tmpDTO.setProcessDelay(tmpList.get(0).getProcessDelay() == null ? 0 : tmpList.get(0).getProcessDelay());
            tmpDTO.setComplete(tmpList.get(0).getComplete() == null ? 0 : tmpList.get(0).getComplete());
            tmpDTO.setFinish(tmpList.get(0).getFinish() == null ? 0 : tmpList.get(0).getFinish());
            tmpDTO.setFinishDelay(tmpList.get(0).getFinishDelay() == null ? 0 : tmpList.get(0).getFinishDelay());
            tmpDTO.setFailure(tmpList.get(0).getFailure() == null ? 0 : tmpList.get(0).getFailure());
            tmpDTO.setCancel(tmpList.get(0).getCancel() == null ? 0 : tmpList.get(0).getCancel());

            assignmentList.add(tmpDTO);
        }

        // 传到前台的id
        for (int i = 0; i < assignmentList.size(); i++) {
            assignmentList.get(i).setId((long)i);
        }
        jsonData.setTotalCount((long) assignmentList.size());
        jsonData.setData(assignmentList);

        return jsonData;
    }

    /**
     * 根据登录用户的信息，查询任务
     *
     * @param page
     * @param limit
     * @param jsonStr
     * @return
     */
    @Override
    public JsonData getColumnChartData(Integer page, Integer limit, String jsonStr) {
        JsonData jsonData = new JsonData();
        String[] result = getSqlWhere(jsonStr);
        String orgCode = result[0];
        String condition = result[1];

        //1、先查找该中心代码所直属的部门信息
        List<OrganizationBean> organizatioBeen = organizationBeanDao.find("select ob from OrganizationBean ob where ob.code like ?1 order by ob.name", orgCode + "___");

        //2、获得查询的sql语句
        String sql = getNativeQueryStr();

        //获得返回的结果类
        Class<? extends BaseDTO> cls = getResultClass();
        Assert.notNull(cls, "返回查询结果类不能为空.");
        //sql = sql + condition;

        //3、循环查找该中心代码下的任务数，放到chartList中
        List<AssignmentColumnChartDTO> chartList = new ArrayList<>();
        for (int i = 0; i < organizatioBeen.size(); i++) {
            String tmpSql = sql + " where orgCode like '" + organizatioBeen.get(i).getCode() + "%' " + condition;
            List<AssignmentColumnChartDTO> tmpList = dao.findByNativeSql(tmpSql, AssignmentColumnChartDTO.class, "");
            //如果数据为空，那么初始为0
            if (tmpList.get(0).getTotal() != 0) {
                AssignmentColumnChartDTO tmpDTO = new AssignmentColumnChartDTO();
                tmpDTO.setOrgName(organizatioBeen.get(i).getName());
                tmpDTO.setTotal(tmpList.get(0).getTotal());
                tmpDTO.setWaiting(tmpList.get(0).getWaiting() == null ? 0 : tmpList.get(0).getWaiting());
                tmpDTO.setReject(tmpList.get(0).getReject() == null ? 0 : tmpList.get(0).getReject());
                tmpDTO.setProcess(tmpList.get(0).getProcess() == null ? 0 : tmpList.get(0).getProcess());
                tmpDTO.setProcessDelay(tmpList.get(0).getProcessDelay() == null ? 0 : tmpList.get(0).getProcessDelay());
                tmpDTO.setComplete(tmpList.get(0).getComplete() == null ? 0 : tmpList.get(0).getComplete());
                tmpDTO.setFinish(tmpList.get(0).getFinish() == null ? 0 : tmpList.get(0).getFinish());
                tmpDTO.setFinishDelay(tmpList.get(0).getFinishDelay() == null ? 0 : tmpList.get(0).getFinishDelay());
                tmpDTO.setFailure(tmpList.get(0).getFailure() == null ? 0 : tmpList.get(0).getFailure());
                tmpDTO.setCancel(tmpList.get(0).getCancel() == null ? 0 : tmpList.get(0).getCancel());

                chartList.add(tmpDTO);
            }
        }

        //4、查询该中心下的任务数
        String tmpSql = "select orgName,count(*) as total," +
                "sum(case when state=0 then 1 else 0 end) as waiting," +
                "sum(case when state=1 then 1 else 0 end) as reject," +
                "sum(case when state=2 then 1 else 0 end) as process," +
                "sum(case when state=2 and endDate < now() then 1 else 0 end) as processDelay," +
                "sum(case when state=3 then 1 else 0 end) as complete," +
                "sum(case when state=4 then 1 else 0 end) as finish," +
                "sum(case when state=4 and endDate < finishDate then 1 else 0 end) as finishDelay," +
                "sum(case when state=5 then 1 else 0 end) as failure," +
                "sum(case when state=6 then 1 else 0 end) as cancel " +
                "from " + dao.getTableName() +
                " where 1=1 and orgCode='" + orgCode+"'" + condition + " group by orgName";
        List<AssignmentColumnChartDTO> tmpList = dao.findByNativeSql(tmpSql, AssignmentColumnChartDTO.class, "");
        if (tmpList.size() != 0) {
            //如果数据为空，那么初始为0
            if (tmpList.get(0).getTotal() != 0) {
                AssignmentColumnChartDTO tmpDTO = new AssignmentColumnChartDTO();
                tmpDTO.setOrgName(tmpList.get(0).getOrgName());
                tmpDTO.setTotal(tmpList.get(0).getTotal());
                tmpDTO.setWaiting(tmpList.get(0).getWaiting() == null ? 0 : tmpList.get(0).getWaiting());
                tmpDTO.setReject(tmpList.get(0).getReject() == null ? 0 : tmpList.get(0).getReject());
                tmpDTO.setProcess(tmpList.get(0).getProcess() == null ? 0 : tmpList.get(0).getProcess());
                tmpDTO.setProcessDelay(tmpList.get(0).getProcessDelay() == null ? 0 : tmpList.get(0).getProcessDelay());
                tmpDTO.setComplete(tmpList.get(0).getComplete() == null ? 0 : tmpList.get(0).getComplete());
                tmpDTO.setFinish(tmpList.get(0).getFinish() == null ? 0 : tmpList.get(0).getFinish());
                tmpDTO.setFinishDelay(tmpList.get(0).getFinishDelay() == null ? 0 : tmpList.get(0).getFinishDelay());
                tmpDTO.setFailure(tmpList.get(0).getFailure() == null ? 0 : tmpList.get(0).getFailure());
                tmpDTO.setCancel(tmpList.get(0).getCancel() == null ? 0 : tmpList.get(0).getCancel());

                chartList.add(tmpDTO);
            }
        }

        // 传到前台的id
        for (int i = 0; i < chartList.size(); i++) {
            chartList.get(i).setId((long)i);
        }
        jsonData.setTotalCount((long) chartList.size());
        jsonData.setData(chartList);

        return jsonData;
    }

    @Override
    public JsonData getPieChartData(Integer page, Integer limit, String jsonStr) {
        JsonData jsonData = new JsonData();
        String[] result = getSqlWhere(jsonStr);
        String orgCode = result[0];
        String condition = result[1];

        //1、先查询出任务总数
        float total = dao.findByNativeSql("select * from " + dao.getTableName() + " where 1=1 " + condition, AssignmentBean.class, null).size();

        //2、先查找该中心代码所直属的部门信息
        List<OrganizationBean> organizatioBeen = organizationBeanDao.find("select ob from OrganizationBean ob where ob.code like ?1 order by ob.name", orgCode + "___");

        //3、循环查找该中心代码下各个组织机构下的任务数，放到chartList中
        List<AssignmentPieChartDTO> chartList = new ArrayList<>();
        for (int i = 0; i < organizatioBeen.size(); i++) {
            String tmpSql = "select * from " + dao.getTableName() + " where 1=1 " + condition + " and orgCode like '" + organizatioBeen.get(i).getCode() + "%'";
            List<AssignmentBean> tmpList = dao.findByNativeSql(tmpSql, AssignmentBean.class, "");
            //如果数据为空,不加入
            if (tmpList.size() != 0) {
                float ft = (tmpList.size() / total) * 100;
                int scale = 2;//设置小数位数
                int roundingMode = 4;//表示四舍五入，可以选择其他舍值方式，例如去尾
                BigDecimal bd = new BigDecimal((double) ft);
                bd = bd.setScale(scale, roundingMode);
                ft = bd.floatValue();
                AssignmentPieChartDTO tmpDTO = new AssignmentPieChartDTO();
                tmpDTO.setOrgName(organizatioBeen.get(i).getName());
                tmpDTO.setPercent(ft);
                chartList.add(tmpDTO);
            }
        }

        //4、查找本单位的
        String tmpSql = "select * from " + dao.getTableName() + " where  1=1 and orgCode='" + orgCode+"'" + condition;
        List<AssignmentBean> tmpList = dao.findByNativeSql(tmpSql, AssignmentBean.class, null);
        if (tmpList.size() != 0) {
            float ft = (tmpList.size() / total) * 100;
            int scale = 2;//设置小数位数
            int roundingMode = 4;//表示四舍五入，可以选择其他舍值方式，例如去尾
            BigDecimal bd = new BigDecimal((double) ft);
            bd = bd.setScale(scale, roundingMode);
            ft = bd.floatValue();
            AssignmentPieChartDTO tmpDTO = new AssignmentPieChartDTO();
            tmpDTO.setOrgName(tmpList.get(0).getOrgName());
            tmpDTO.setPercent(ft);
            chartList.add(tmpDTO);
        }

        //判断没有数据的情况
        if (chartList.size() == 0) {
            AssignmentPieChartDTO tmpDTO = new AssignmentPieChartDTO();
            tmpDTO.setOrgName("没有数据");
            tmpDTO.setPercent(100f);
            chartList.add(tmpDTO);
        }

        // 传到前台的id
        for (int i = 0; i < chartList.size(); i++) {
            chartList.get(i).setId((long)i);
        }
        jsonData.setTotalCount((long) chartList.size());
        jsonData.setData(chartList);

        return jsonData;
    }

    @Override
    protected String getNativeQueryStr() {
        return "select count(*) as total," +
                "sum(case when state=0 then 1 else 0 end) as waiting," +
                "sum(case when state=1 then 1 else 0 end) as reject," +
                "sum(case when state=2 then 1 else 0 end) as process," +
                "sum(case when state=3 then 1 else 0 end) as complete," +
                "sum(case when state=4 then 1 else 0 end) as finish," +
                "sum(case when state=5 then 1 else 0 end) as failure," +
                "sum(case when state=6 then 1 else 0 end) as cancel " +
                "from " + dao.getTableName();
    }

    @Override
    protected Class<? extends BaseDTO> getResultClass() {
        return AssignmentColumnChartDTO.class;
    }

    public IUserBeanService getUserBeanService() {
        return userBeanService;
    }

    public void setUserBeanService(IUserBeanService userBeanService) {
        this.userBeanService = userBeanService;
    }

    public void setOrganizationBeanDao(IOrganizationBeanDao organizationBeanDao) {
        this.organizationBeanDao = organizationBeanDao;
    }

    public void setScheduleDictBeanService(IScheduleDictBeanService scheduleDictBeanService) {
        this.scheduleDictBeanService = scheduleDictBeanService;
    }
}
