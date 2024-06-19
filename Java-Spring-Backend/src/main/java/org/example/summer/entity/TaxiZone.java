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
@Table(name="taxi_zones")
public class TaxiZone {

    @Id
    @Column(name="zone_id")
    @Getter
    @Setter
    private int zoneId;

    @Column(name="neighbourhood")
    @Getter
    @Setter
    private String neighbourhood;

    @Column(name="borough")
    @Getter
    @Setter
    private String borough;

    @Column(name="shape_length")
    @Getter
    @Setter
    private float shapeLength;

    @Column(name="shape_area")
    @Getter
    @Setter
    private float shapeArea;

    @JsonSerialize(using=GeometrySerializer.class)
    @Column(name="polygon_coords", columnDefinition="geometry(MultiPolygon, 4326)")
    @Getter
    @Setter
    private MultiPolygon polygonCoords;

    @Override
    public String toString() {
        return "TaxiZones{" +
                "zoneId=" + zoneId +
                ", neighbourhood='" + neighbourhood + '\'' +
                ", borough='" + borough + '\'' +
                ", shapeLength=" + shapeLength +
                ", shapeArea=" + shapeArea +
                ", polygonCoords=" + polygonCoords +
                '}';
    }
}
