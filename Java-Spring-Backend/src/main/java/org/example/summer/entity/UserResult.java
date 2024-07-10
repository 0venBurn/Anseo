package org.example.summer.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.summer.config.ResultsConverter;

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

    @Convert(converter = ResultsConverter.class)
    @Column(columnDefinition = "jsonb")
    private Results results;

    @Column(columnDefinition = "timestamp with time zone", insertable = false, updatable = false)
    private Timestamp timestamp;
}
