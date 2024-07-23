package org.example.summer.dao;

import org.example.summer.entity.Neighbourhood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NeighbourhoodRepository extends JpaRepository<Neighbourhood, Integer> {
}
