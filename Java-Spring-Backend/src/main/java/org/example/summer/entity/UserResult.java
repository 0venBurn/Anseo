package org.example.summer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users_results")
public class UserResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private int resultId;

    @Column(name = "clerk_user_id")
    private String clerkUserId;

    @Column(name = "predictions")
    private String predictions;

    @Column(name = "selected_boroughs")
    private String selectedBoroughs;

    @Column(name = "top_neighbourhood_name")
    private String topNeighbourhoodName;

    @Column(name = "top_neighbourhood_rating")
    private double topNeighbourhoodRating;

    @Column(columnDefinition = "timestamp with time zone", insertable = false, updatable = false)
    private Timestamp timestamp;
}
