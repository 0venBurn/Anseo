package org.example.summer.controller;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.summer.dao.ListingRepository;
import org.example.summer.entity.Listing;
import org.example.summer.entity.Neighbourhood;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/listings")
@RequiredArgsConstructor
@CrossOrigin
public class ListingController {

    private final ListingRepository listingRepository;

    @GetMapping("/")
    public List<Listing> getListings() {
        return listingRepository.findAll();
    }

    @GetMapping("/{id}")
    public Listing getListing(@PathVariable int id) {
        Optional<Listing> listing = listingRepository.findById(id);
        return listing.orElseThrow(() -> new EntityNotFoundException("Listing not found"));
    }
}
