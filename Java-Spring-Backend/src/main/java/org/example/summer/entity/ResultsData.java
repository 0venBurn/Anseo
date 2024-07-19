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
    private List<Integer> selectedAgeGroup;
    private double ageImportance;
    private List<Integer> selectedIncomeLevel;
    private double incomeImportance;
    private List<String> targetGroup;
    private double proximityImportance;
    private double footfallImportance;
    private double surroundingBusinessesImportance;
    private int rentBudget;
    private double genderRatio;
    private List<String> employmentStatus;
    private double populationDensity;
    private List<String> selectedBoroughs;
    private List<String> areaType;
}
