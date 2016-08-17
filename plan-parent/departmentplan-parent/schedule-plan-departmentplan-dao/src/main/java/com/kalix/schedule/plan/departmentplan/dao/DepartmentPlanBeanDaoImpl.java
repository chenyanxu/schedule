package com.kalix.schedule.plan.departmentplan.dao;

import com.kalix.framework.core.api.web.model.QueryDTO;
import com.kalix.framework.core.impl.dao.GenericDao;
import com.kalix.schedule.plan.departmentplan.api.dao.IDepartmentPlanBeanDao;
import com.kalix.schedule.plan.departmentplan.entities.DepartmentPlanBean;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.SingularAttribute;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
public class DepartmentPlanBeanDaoImpl extends GenericDao<DepartmentPlanBean, Long> implements IDepartmentPlanBeanDao {
    @Override
    @PersistenceContext(unitName = "schedule-plan-departmentplan-unit")
    public void setEntityManager(EntityManager em) {
        super.setEntityManager(em);
    }
    //todo add custom query

    @Override
    public CriteriaQuery buildCriteriaQuery(QueryDTO queryDTO) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<DepartmentPlanBean> criteriaQuery = criteriaBuilder.createQuery(DepartmentPlanBean.class);
        Root<DepartmentPlanBean> root = criteriaQuery.from(DepartmentPlanBean.class);
        EntityType<DepartmentPlanBean> bean_ = root.getModel(); //实体元数据
        List<Predicate> predicatesList = new ArrayList<Predicate>();
        Map<String, String> jsonMap = queryDTO.getJsonMap();


        for (Map.Entry<String, String> entry : jsonMap.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            SingularAttribute<DepartmentPlanBean, Object> attribute = null;

            String attrJavaTypeName = null;

            if (value == null || value.trim().isEmpty()) {
                continue;
            }

            if (key.contains(":begin:gt") || key.contains(":end:lt")) {
                attribute = (SingularAttribute<DepartmentPlanBean, Object>) bean_.getSingularAttribute(key.split(":")[0]);
            } else {
                attribute = (SingularAttribute<DepartmentPlanBean, Object>) bean_.getSingularAttribute(key);
            }

            attrJavaTypeName = attribute.getJavaType().getName();

            if (attrJavaTypeName.equals(String.class.getName())) {
                SingularAttribute<DepartmentPlanBean, String> tempAttribute = (SingularAttribute<DepartmentPlanBean, String>)bean_.getSingularAttribute(key);
                if ("orgCode".equals(key)) {
                    predicatesList.add(criteriaBuilder.like(root.get(tempAttribute), value + "%"));
                }
                else {
                    predicatesList.add(criteriaBuilder.like(root.get(tempAttribute), "%" + value + "%"));
                }

            } else if (attrJavaTypeName.equals(long.class.getName()) || attrJavaTypeName.equals(Long.class.getName())) {
                predicatesList.add(criteriaBuilder.equal(root.get(attribute), new Long(value)));
            } else if (attrJavaTypeName.equals(int.class.getName()) || attrJavaTypeName.equals(Integer.class.getName())) {
                predicatesList.add(criteriaBuilder.equal(root.get(attribute), new Integer(value)));
            } else if (attrJavaTypeName.equals(short.class.getName()) || attrJavaTypeName.equals(Short.class.getName())) {
                predicatesList.add(criteriaBuilder.equal(root.get(attribute), new Short(value)));
            } else if(attrJavaTypeName.equals(Date.class.getName())){
                SingularAttribute<DepartmentPlanBean, Date> tempAttribute = (SingularAttribute<DepartmentPlanBean, Date>)bean_.getSingularAttribute(key.split(":")[0]);
                DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

                try {
                    Date date = dateFormat.parse(value);

                    if(key.contains(":begin:gt")){
                        predicatesList.add(criteriaBuilder.greaterThanOrEqualTo(root.get(tempAttribute), date));
                    }
                    else if(key.contains(":end:lt")){
                        predicatesList.add(criteriaBuilder.lessThanOrEqualTo(root.get(tempAttribute), date));
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
        }

        criteriaQuery.where(predicatesList.toArray(new Predicate[predicatesList.size()]));
        CriteriaQuery select = criteriaQuery.select(root);
        select.orderBy(criteriaBuilder.desc(root.get("creationDate")));
        return select;
    }
}
