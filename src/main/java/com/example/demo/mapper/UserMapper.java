package com.example.demo.mapper;

import com.example.demo.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

@Repository
public interface UserMapper extends Mapper<User> {
    @Select("SELECT id, username, password FROM web_users WHERE username = #{account} AND password = #{password}")
    User login(User user);

    @Insert("INSERT INTO web_users(username, password) VALUES(#{account}, #{password})")
    void register(User user);
}
