package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public User login(User user){
        User  loginUser=userMapper.login(user);
        if(loginUser==null){
            return null;
        }
        return loginUser;
    }

    public void register(User user) {
        userMapper.register(user);
    }
}
