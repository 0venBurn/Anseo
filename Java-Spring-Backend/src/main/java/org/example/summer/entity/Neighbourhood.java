package org.example.summer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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
    private int neighbourhoodId;

    @Column(name="borough")
    private String borough;

    @Column(name="zipcode")
    private String zipcode;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "landmarks", columnDefinition = "text[]")
    private List<String> landmarks;
}
