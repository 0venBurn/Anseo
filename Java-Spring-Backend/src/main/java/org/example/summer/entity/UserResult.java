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

    @Column(columnDefinition = "jsonb")
    private String results;

    @Column(columnDefinition = "timestamp with time zone")
    private Timestamp timestamp;
}
