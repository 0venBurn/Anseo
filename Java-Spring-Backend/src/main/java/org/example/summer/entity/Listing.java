package org.example.summer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "listing_data")
public class Listing {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "listingdetails")
    private String listingDetails;

    @Column(name = "link")
    private String link;

    @Column(name = "imageurl")
    private String imageUrl;

    @Column(name = "lat")
    private String lat;

    @Column(name = "lon")
    private String lng;

    @Column(name = "neighbourhood_id")
    private int neighbourhoodId;
}
