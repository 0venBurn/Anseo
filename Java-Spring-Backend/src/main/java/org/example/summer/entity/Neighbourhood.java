package org.example.summer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "neighbourhoods")
public class Neighbourhood {

    @Id
    @Column(name="neighbourhood_id")
    private int id;

    @Column(name="borough")
    private String borough;

    @Column(name="zipcode")
    private String zipcode;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="landmarks", columnDefinition="VARCHAR(255)[]")
    private List<String> landmarks;

    @Column(name="photo_path")
    private String photo_path;
}
