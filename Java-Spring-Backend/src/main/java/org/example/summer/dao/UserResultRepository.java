package org.example.summer.dao;

import org.example.summer.entity.UserResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserResultRepository extends JpaRepository<UserResult, Integer> {

    @Query("SELECT ur FROM UserResult ur WHERE ur.clerkUserId=:clerkUserId ORDER BY ur.timestamp DESC")
    List<UserResult> findResultsByIdOrderByTimestamp(@Param("clerkUserId") String clerkUserId);
}
