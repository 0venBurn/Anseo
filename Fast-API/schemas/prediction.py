from typing import List

from pydantic import BaseModel


class PredictionRequest(BaseModel):
    data: List[List[float]]


class PredictionResponse(BaseModel):
    predictions: List[int]
