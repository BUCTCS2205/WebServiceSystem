package com.example.demo.mapper;

import com.example.demo.entity.Relic;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

@Repository
public interface RelicMapper extends Mapper<Relic> {
    @Select("SELECT id, title, age, material, description, url FROM met_clear")
    List<Relic> getRelic();
}
