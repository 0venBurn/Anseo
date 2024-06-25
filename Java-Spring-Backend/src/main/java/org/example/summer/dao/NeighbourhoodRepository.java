package org.example.summer.dao;

import org.example.summer.entity.Neighbourhood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NeighbourhoodRepository extends JpaRepository<Neighbourhood, Integer> {
}
