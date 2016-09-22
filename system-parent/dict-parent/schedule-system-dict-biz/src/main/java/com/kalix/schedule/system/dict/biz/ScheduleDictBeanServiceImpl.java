package com.kalix.schedule.system.dict.biz;

import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.system.BaseDictServiceImpl;
import com.kalix.schedule.system.dict.api.biz.IScheduleDictBeanService;
import com.kalix.schedule.system.dict.api.dao.IScheduleDictBeanDao;
import com.kalix.schedule.system.dict.entities.ScheduleDictBean;

import javax.transaction.Transactional;

public class ScheduleDictBeanServiceImpl extends BaseDictServiceImpl<IScheduleDictBeanDao, ScheduleDictBean> implements IScheduleDictBeanService {
    @Override
    @Transactional
    public JsonStatus saveEntity(ScheduleDictBean entity) {
        Integer maxValue = dao.getFieldMaxValue("value","type='"+entity.getType()+"'");

        maxValue=maxValue+1;
        entity.setValue(maxValue);

        return super.saveEntity(entity);
    }
}
