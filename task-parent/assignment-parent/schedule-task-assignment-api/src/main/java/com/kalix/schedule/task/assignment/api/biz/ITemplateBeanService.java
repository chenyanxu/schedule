package com.kalix.schedule.task.assignment.api.biz;

import com.kalix.framework.core.api.biz.IBizService;
import com.kalix.framework.core.api.persistence.JsonStatus;
import com.kalix.schedule.task.assignment.entities.TemplateBean;

/**
 * @类描述：应用服务接口.
 * @创建人：
 * @创建时间：
 * @修改人：
 * @修改时间：
 * @修改备注：
 */
public interface ITemplateBeanService extends IBizService<TemplateBean> {
    //在此添加新的业务方法
    JsonStatus saveTemplateEntity(TemplateBean entity);
}
