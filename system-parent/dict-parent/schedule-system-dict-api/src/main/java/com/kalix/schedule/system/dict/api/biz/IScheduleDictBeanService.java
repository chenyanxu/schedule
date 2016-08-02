package com.kalix.schedule.system.dict.api.biz;

import com.kalix.framework.core.api.biz.IBizService;
import com.kalix.schedule.system.dict.entities.ScheduleDictBean;

import java.util.List;
import java.util.Map;

public interface IScheduleDictBeanService extends IBizService<ScheduleDictBean> {
    List<Map> getDictTypes(String query);
}
