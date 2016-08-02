package com.kalix.schedule.system.dict.biz;

import com.kalix.framework.core.api.cache.ICacheManager;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.framework.core.impl.biz.ShiroGenericBizServiceImpl;
import com.kalix.framework.core.util.ConfigUtil;
import com.kalix.framework.core.util.SerializeUtil;
import com.kalix.schedule.system.dict.api.biz.IScheduleDictBeanService;
import com.kalix.schedule.system.dict.api.dao.IScheduleDictBeanDao;
import com.kalix.schedule.system.dict.entities.ScheduleDictBean;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ScheduleDictBeanServiceImpl extends ShiroGenericBizServiceImpl<IScheduleDictBeanDao, ScheduleDictBean> implements IScheduleDictBeanService {
    private ICacheManager cacheManager=null;
    private List<Map> dictTypes=null;

    @Override
    public JsonStatus saveEntity(ScheduleDictBean entity) {
        Integer maxValue = dao.getFieldMaxValue("value","type='"+entity.getType()+"'");

        maxValue=maxValue+1;

        entity.setValue(maxValue.toString());

        return super.saveEntity(entity);
    }

    @Override
    public List getAllEntity() {
        List rtn = null;

        if (this.cacheManager.exists("schedule_dict_cache")) {
            rtn = SerializeUtil.unserialize(cacheManager.getObj("schedule_dict_cache"));
        } else {
            Object obj = ConfigUtil.getConfigProp("dict_cache_timeout", "ConfigScheduleDict");
            int cacheTimeout = obj == null ? 600 : new Integer(obj.toString());

            rtn = super.getAllEntity();
            this.cacheManager.save("schedule_dict_cache", rtn, cacheTimeout);
        }

        return rtn;
    }

    public void setCacheManager(ICacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    @Override
    public List<Map> getDictTypes(String query) {
        if(dictTypes==null){
            dictTypes=new ArrayList<>();
            Map map=null;
            Object obj = ConfigUtil.getConfigProp("dict_types", "ConfigScheduleDict");

            for (String str :obj.toString().split(",")) {
                map=new HashMap<>();
                map.put("name",str);
                dictTypes.add(map);
            }
        }

        if(query!=null && !query.trim().equals("")){
            List<Map> rtn=new ArrayList<>();

            for(Map map:dictTypes){
                if(map.get("name").toString().contains(query.trim())){
                    rtn.add(map);
                }
            }

            return rtn;
        }

        return dictTypes;
    }
}
