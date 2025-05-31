package com.example.demo.controller;

import com.example.demo.entity.Relic;
import com.example.demo.entity.Result;
import com.example.demo.service.RelicService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/relic")
public class RelicController {
    @Autowired
    private RelicService relicService;
    @GetMapping()
    public Result getRelic() {
        List<Relic> relic = relicService.getRelic();
        return Result.success(relic);
    }

//    @GetMapping()
//    public Result getRelic() {
//        return Result.success("test");
//    }
}
