package com.kalix.schedule.plan.personalplan.dao;

import com.kalix.admin.core.entities.OrganizationBean;
import com.kalix.admin.core.entities.UserBean;
import com.kalix.framework.core.api.web.model.QueryDTO;
import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.framework.core.util.DateUtil;
import com.kalix.framework.core.util.StringUtils;
import com.kalix.schedule.plan.personalplan.api.dao.IPersonalPlanBeanDao;
import com.kalix.schedule.plan.personalplan.entities.PersonalPlanBean;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.SingularAttribute;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @类描述：
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public class PersonalPlanBeanDaoImpl extends GenericDao<PersonalPlanBean, Long> implements IPersonalPlanBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-plan-personalplan-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }
    //todo add custom query

    /**
     * 查询指定id内的个人计划信息
     *
     * @param id
     * @return
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<PersonalPlanBean> findById(List<Long> id) {

        if (id != null && !id.isEmpty()) {
            return (List<PersonalPlanBean>) this.find("select ob from PersonalPlanBean ob where ob.id in (?1) ", id);
        } else {
            return new ArrayList<>();


        }
    }

    @Override
    public CriteriaQuery buildCriteriaQuery(QueryDTO queryDTO) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<PersonalPlanBean> criteriaQuery = criteriaBuilder.createQuery(PersonalPlanBean.class);
        Root<PersonalPlanBean> root = criteriaQuery.from(PersonalPlanBean.class);

        //CriteriaQuery<UserBean> criteriaUserQuery = criteriaBuilder.createQuery(UserBean.class);

        //sunlf added begin
        Root<UserBean> userRoot = criteriaQuery.from(UserBean.class);
        Root<OrganizationBean> orgRoot = criteriaQuery.from(OrganizationBean.class);
        //sunlf added end

        EntityType<PersonalPlanBean> bean_ = root.getModel(); //实体元数据
        List<Predicate> predicatesList = new ArrayList<Predicate>();
        Map<String, String> jsonMap = queryDTO.getJsonMap();
        String sortField = "updateDate";
        String sortDirection = "DESC";


        for (Map.Entry<String, String> entry : jsonMap.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            SingularAttribute<PersonalPlanBean, Object> attribute = null;

            String attrJavaTypeName = null;

            if (value == null || value.trim().isEmpty()) {
                continue;
            }

            boolean isIn = false;
            if (key.contains("%")) {
                attribute = (SingularAttribute<PersonalPlanBean, Object>) bean_.getSingularAttribute(key.replace("%", ""));
            } else if (key.contains(":begin:gt") || key.contains(":end:lt")) {
                attribute = (SingularAttribute<PersonalPlanBean, Object>) bean_.getSingularAttribute(key.split(":")[0]);
            } else if (key.contains(":in")) {
                isIn = true;
                attribute = (SingularAttribute<PersonalPlanBean, Object>) bean_.getSingularAttribute(key.split(":")[0]);
            } else if (key.contains(":sort")) {
                if (bean_.getAttributes().toString().indexOf("." + key.replace(":sort", "")) > -1) {
                    sortField = key.replace(":sort", "");
                    sortDirection = value;
                }

                continue;
            } else {
                attribute = (SingularAttribute<PersonalPlanBean, Object>) bean_.getSingularAttribute(key);
            }

            attrJavaTypeName = attribute.getJavaType().getName();

            if (attrJavaTypeName.equals(String.class.getName())) {
                if (isIn) {
                    String[] s = value.split(",");
                    predicatesList.add(root.get(attribute.getName()).in(s));
                } else {
                    SingularAttribute<PersonalPlanBean, String> tempAttribute = (SingularAttribute<PersonalPlanBean, String>) bean_.getSingularAttribute(key.replace("%", ""));
                    int cIndex = key.indexOf("%");

                    switch (cIndex) {
                        case -1:
                            predicatesList.add(criteriaBuilder.like(root.get(tempAttribute), "%" + value + "%"));
                            break;
                        case 0:
                            predicatesList.add(criteriaBuilder.like(root.get(tempAttribute), "%" + value));
                            break;
                        default:
                            predicatesList.add(criteriaBuilder.like(root.get(tempAttribute), value + "%"));
                            break;
                    }
                }
            } else if (attrJavaTypeName.equals(long.class.getName()) || attrJavaTypeName.equals(Long.class.getName())) {
                if (isIn) {
                    String[] s = value.split(",");
                    predicatesList.add(root.get(attribute.getName()).in(StringUtils.toLongArray(s)));
                } else {
                    predicatesList.add(criteriaBuilder.equal(root.get(attribute), new Long(value)));
                }
            } else if (attrJavaTypeName.equals(int.class.getName()) || attrJavaTypeName.equals(Integer.class.getName())) {
                if (isIn) {
                    String[] s = value.split(",");
                    predicatesList.add(root.get(attribute.getName()).in(StringUtils.toIntArray(s)));
                } else {
                    predicatesList.add(criteriaBuilder.equal(root.get(attribute), new Integer(value)));
                }
            } else if (attrJavaTypeName.equals(short.class.getName()) || attrJavaTypeName.equals(Short.class.getName())) {
                if (isIn) {
                    String[] s = value.split(",");
                    predicatesList.add(root.get(attribute.getName()).in(StringUtils.toShortArray(s)));
                } else {
                    predicatesList.add(criteriaBuilder.equal(root.get(attribute), new Short(value)));
                }
            } else if (attrJavaTypeName.equals(Date.class.getName())) {
                SingularAttribute<PersonalPlanBean, Date> tempAttribute = (SingularAttribute<PersonalPlanBean, Date>) bean_.getSingularAttribute(key.split(":")[0]);
                try {
                    Date date = new SimpleDateFormat("yyyy-MM-dd").parse(value);
                    if (key.contains(":begin:gt")) {
                        predicatesList.add(criteriaBuilder.greaterThanOrEqualTo(root.get(tempAttribute), DateUtil.getCurrentDayStartTime(date)));
                    } else if (key.contains(":end:lt")) {
                        predicatesList.add(criteriaBuilder.lessThanOrEqualTo(root.get(tempAttribute), DateUtil.getCurrentDayEndTime(date)));
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            //sunlf added begin
            predicatesList.add(criteriaBuilder.equal(root.get("userId"), userRoot.get("id")));
            predicatesList.add(criteriaBuilder.equal(root.get("orgId"), orgRoot.get("id")));
            //sunlf added end
        }

        criteriaQuery.where(predicatesList.toArray(new Predicate[predicatesList.size()]));
        List<Selection> selectionList = new ArrayList<Selection>
                (Arrays.asList(root, userRoot));
        CriteriaQuery select = criteriaQuery.multiselect(root, userRoot.get("name").alias("userName"), orgRoot.get("name").alias("orgName"));//select(root);elect(root);

        //排序
        switch (sortDirection) {
            case "DESC":
                select.orderBy(criteriaBuilder.desc(root.get(sortField)));
                break;
            case "ASC":
                select.orderBy(criteriaBuilder.asc(root.get(sortField)));
                break;
        }

        return select;
    }

    /*@Override
    public JsonData getAll(int page, int limit,CriteriaQuery criteriaQuery) {
        JsonData jsonData = new JsonData();
        Class entityClass = null;

        TypedQuery typedQuery = entityManager.createQuery(criteriaQuery);
        jsonData.setTotalCount(getTotalCount("", criteriaQuery));
        jsonData.setData(typedQuery.getResultList());
        return jsonData;
    }*/

    /*private Long getTotalCount(String className, CriteriaQuery criteriaQuery) {
        Long count =0L;
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
//        CriteriaQuery countQuery = criteriaBuilder.createQuery();
        //构造where条件
//        countQuery.where(criteriaQuery.getRestriction());
        //构造from
        Set<Root> rootSet=criteriaQuery.getRoots();
        *//*for (Root root : rootSet) {
            countQuery.from(root.getModel());
        }*//*
        //构造select
        Root[] arr = new Root[rootSet.size()];
        rootSet.toArray(arr);
        criteriaQuery.select(criteriaBuilder.count(arr[0].get("id")));
        criteriaQuery.orderBy((Order[]) null);
        System.out.println("jpql statement is : "+criteriaQuery.toString());
        TypedQuery query= entityManager.createQuery(criteriaQuery);
//        System.out.println("sql statement is : "+query.unwrap(DelegatingQuery.class).getQueryString());
        List results=query.getResultList();
        if(!results.isEmpty())
        {
            count= (Long) results.get(0);
        }
        return count;
//        return Long.valueOf(entityManager.createQuery(criteriaQuery).getResultList().size());
    }*/
}
