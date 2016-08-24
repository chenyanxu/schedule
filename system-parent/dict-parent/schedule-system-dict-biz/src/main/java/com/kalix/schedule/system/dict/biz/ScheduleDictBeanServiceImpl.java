package com.kalix.schedule.system.dict.biz;

import com.kalix.framework.core.api.cache.ICacheManager;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.impl.system.BaseDictServiceImpl;
import com.kalix.framework.core.util.ConfigUtil;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.system.dict.api.biz.IScheduleDictBeanService;
import com.kalix.schedule.system.dict.api.dao.IScheduleDictBeanDao;
import com.kalix.schedule.system.dict.entities.ScheduleDictBean;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ScheduleDictBeanServiceImpl extends BaseDictServiceImpl<IScheduleDictBeanDao, ScheduleDictBean> implements IScheduleDictBeanService {
    @Override
    public JsonStatus saveEntity(ScheduleDictBean entity) {
        Integer maxValue = dao.getFieldMaxValue("value","type='"+entity.getType()+"'");

        maxValue=maxValue+1;
        entity.setValue(maxValue);

        return super.saveEntity(entity);
    }
}
