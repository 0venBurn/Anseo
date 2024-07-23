package org.example.summer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResultRequest {
    private String clerkUserId;

    @JsonProperty("predictions")
    @JsonSerialize(as = Map.class)
    @JsonDeserialize(as = Map.class)
    private Map<String, Double> predictions;

    @JsonProperty("selectedBoroughs")
    @JsonSerialize(as = List.class)
    @JsonDeserialize(as = List.class)
    private List<String> selectedBoroughs;

    private String topNeighbourhoodName;

    private int topNeighbourhoodRating;
}
