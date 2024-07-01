package org.example.summer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue
    private int id;
    private String token;
    private Instant expiryDate;

    @OneToOne
    @JoinColumn(name= "id", referencedColumnName = "id")
    private User user;
}
