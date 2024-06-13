package org.example.summer.controller;

import jakarta.persistence.EntityNotFoundException;
import org.example.summer.dao.TaxiZoneRepository;
import org.example.summer.entity.TaxiZone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/taxiZones")
@CrossOrigin
public class TaxiZoneController {

    @Autowired
    private TaxiZoneRepository taxiZoneRepository;

    @QueryMapping
    public List<TaxiZone> taxiZones() {
            return taxiZoneRepository.findAll();
    }

    @QueryMapping
    public TaxiZone taxiZone(@Argument String zoneId) {
        int id = Integer.parseInt(zoneId);
        Optional<TaxiZone> taxiZone = taxiZoneRepository.findById(id);
        if (taxiZone.isPresent()) {
            return taxiZone.get();
        } else {
            throw new EntityNotFoundException("Taxi zone not found for id: " +  zoneId);
        }
    }
}