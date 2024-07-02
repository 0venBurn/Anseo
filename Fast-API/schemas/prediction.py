from typing import Dict, List, Union

from pydantic import BaseModel


class PredictionRequest(BaseModel):
    data: List[Union[int, str, List[str]]]


class PredictionResponse(BaseModel):
    predictions: Dict[int, float]

