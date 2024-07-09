package org.example.summer.dao;

import org.example.summer.entity.UserResult;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin
public interface UserResultRepository extends CrudRepository<UserResult, String> {

    @Query("SELECT ur FROM UserResult ur WHERE ur.clerkUserId = :clerkUserId ORDER BY ur.timestamp DESC")
    List<UserResult> findResultsByIdOrderByTimestamp(String clerkUserId);
}
