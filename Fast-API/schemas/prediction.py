from pydantic import BaseModel, Field
from typing import Dict, List

class DataModel(BaseModel):
    businessType: str
    openHour: int
    closeHour: int
    budget: float
    selectedAgeGroup: List[int]
    ageImportance: float = Field(ge=0, le=1)
    selectedIncomeLevel: List[int]
    incomeImportance: float
    targetGroup: List[str]
    proximityImportance: float
    footfallImportance: float
    surroundingBusinessesImportance: float
    rentBudget: float
    genderRatio: float
    employmentStatus: List[str]
    homeValue: float
    populationDensity: float
    selectedBoroughs: List[str]
    areaType: List[str]

class PredictionRequest(BaseModel):
    data: DataModel
    
class PredictionResponse(BaseModel):
    predictions: Dict[int, float]