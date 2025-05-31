package com.example.demo.controller;

import com.example.demo.entity.Result;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/login")
    public Result login(@RequestBody User user){
        //System.out.println(user.getAccount());
        //System.out.println(user.getPassword());
        User loginUser=userService.login(user);
        if(loginUser==null){
            return Result.error("用户名或密码错误");
        }
        return Result.success(loginUser);
    }
    @PostMapping("/register")
    public Result register(@RequestBody User user) {
        //System.out.println(user.getAccount());
        userService.register(user);
        return Result.success();
    }
}
