package org.example.summer.controller;

import org.example.summer.dao.ZipCodeRepository;
import org.example.summer.entity.ZipCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/zipCodes")
@CrossOrigin
public class ZipCodeController {

    @Autowired
    private ZipCodeRepository zipCodesRepository;

    @GetMapping("/all")
    public List<ZipCode> getAllZipCodes() {
        return zipCodesRepository.findAll(Sort.by(Sort.Direction.ASC, "zipCode"));
    }
}
