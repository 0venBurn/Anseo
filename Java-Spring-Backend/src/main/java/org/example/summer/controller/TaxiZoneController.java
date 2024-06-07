package org.example.summer.controller;

import org.example.summer.dao.TaxiZoneRepository;
import org.example.summer.entity.TaxiZone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/taxiZones")
@CrossOrigin
public class TaxiZoneController {

    @Autowired
    private TaxiZoneRepository taxiZoneRepository;

    @GetMapping("/all")
    public List<TaxiZone> getAllTaxiZones() {
        return taxiZoneRepository.findAll(Sort.by(Sort.Direction.ASC, "zoneId"));
    }
}