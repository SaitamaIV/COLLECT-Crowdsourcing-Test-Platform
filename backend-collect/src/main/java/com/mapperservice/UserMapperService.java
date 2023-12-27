package com.mapperservice;

import com.po.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapperService extends BaseMapper<User> {

}
