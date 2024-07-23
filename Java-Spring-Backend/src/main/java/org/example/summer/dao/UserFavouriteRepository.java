package org.example.summer.dao;

import org.example.summer.entity.UserFavourite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFavouriteRepository extends JpaRepository<UserFavourite, Integer> {
    List<UserFavourite> findByClerkUserId(String clerkUserId);
    void deleteByClerkUserIdAndNeighbourhoodId(String clerkUserId, int neighbourhoodId);
}
