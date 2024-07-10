package org.example.summer.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultsData {
    private String businessType;
    private int openHour;
    private int closeHour;
    private int budget;
    private String selectedAgeGroup;
    private double ageImportance;
    private String selectedIncomeLevel;
    private double incomeImportance;
    private String targetGroup;
    private double proximityImportance;
    private double footfallImportance;
    private double surroundingBusinessesImportance;
    private int rentBudget;
    private double genderRatio;
    private String employmentStatus;
    private double homeValue;
    private double populationDensity;
    private List<String> selectedBoroughs;
    private String areaType;
}
