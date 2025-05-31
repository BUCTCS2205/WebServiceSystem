package com.example.demo.service;

import com.example.demo.entity.Relic;
import com.example.demo.mapper.RelicMapper;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RelicService {
    @Autowired
    private RelicMapper relicMapper;

    public List<Relic> getRelic() {
        return relicMapper.getRelic();
    }
}
