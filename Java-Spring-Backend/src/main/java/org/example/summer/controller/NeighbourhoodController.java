package org.example.summer.controller;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.summer.dao.NeighbourhoodRepository;
import org.example.summer.dao.UserRepository;
import org.example.summer.entity.Neighbourhood;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/neighbourhoods")
@RequiredArgsConstructor
@CrossOrigin
public class NeighbourhoodController {

    private final NeighbourhoodRepository neighbourhoodRepository;

    @GetMapping("/")
    public List<Neighbourhood> getNeighbourhoods() {
        return neighbourhoodRepository.findAll();
    }

    @GetMapping("/{id}")
    public Neighbourhood getNeighbourhood(@PathVariable int id) {
        Optional<Neighbourhood> neighbourhood = neighbourhoodRepository.findById(id);
        return neighbourhood.orElseThrow(() -> new EntityNotFoundException("Neighbourhood not found"));
    }
}
