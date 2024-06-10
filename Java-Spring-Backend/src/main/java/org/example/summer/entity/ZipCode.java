package org.example.summer.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.example.summer.geo.GeometrySerializer;
import org.locationtech.jts.geom.MultiPolygon;

@Entity
@Table(name="zip_codes")
public class ZipCode {
    @Id
    @Column(name="zip_code")
    @Getter
    @Setter
    private int zipCode;

    @JsonSerialize(using= GeometrySerializer.class)
    @Column(name="geometry", columnDefinition="geometry(MultiPolygon, 4326)")
    @Getter
    @Setter
    private MultiPolygon geometry;
}
