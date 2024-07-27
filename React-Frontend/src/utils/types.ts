export interface Neighbourhood {
name: string;
borough: string;
description: string;
rating: number;
coordinates: [number, number];
photoPath: string;
zipcode: string;
neighbourhood_id: number;
}

export interface Listing {
id: number;
listingDetails: string;
link: string;
imageUrl: string;
lat: string;
lng: string;
neighbourhoodId: number;
}

export interface Indexes {
neighbourhood_id: number;
population_density: number;
index_percPop_0_5: number;
index_percPop_6_11: number;
index_percPop_12_17: number;
male_index: number;
female_index: number;
Normalized_Employment_Health_Index: number;
Annual_Earnings_Index: number;
Housing_Affordability_Index: number;
Safety_Index: number;
age_evenness_index: number;
gender_diversity_index: number;
business_index: number;
}

export interface Predictions {
  [zipcode: string]: number 
}

export interface HighlightedLocation {
lat: number;
lng: number;
}

export interface ZipProbability {
    zipcode: string;
    probability: number;
  }

export interface Data {
  businessType: string;
  openHour: string;
  closeHour: string;
  budget: number;
  selectedAgeGroup: number[];
  ageImportance: number;
  selectedIncomeLevel: number[];
  incomeImportance: number;
  targetGroup: string[];
  proximityImportance: number;
  footfallImportance: number;
  surroundingBusinessesImportance: number;
  rentBudget: number;
  genderRatio: string;
  employmentStatus: string[];
  populationDensity: number;
  selectedBoroughs: string[];
  areaType: string[];
}

export interface Payload {
  data: Data
}

export interface UserHistory {
  resultId: number;
  clerkUserId: string;
  predictions: Predictions;
  topNeighbourhoodName: string
  topNeighbourhoodRating: number;
  selectedBoroughs: string[];
  timestamp: number;
}