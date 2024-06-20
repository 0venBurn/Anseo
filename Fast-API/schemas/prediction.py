from typing import Dict, List

from pydantic import BaseModel


class PredictionRequest(BaseModel):
    data: Dict[str, float]


class PredictionResponse(BaseModel):
    predictions: Dict[int, float]

