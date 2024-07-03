from typing import Dict, List, Union

from pydantic import BaseModel


class PredictionRequest(BaseModel):
    data: Dict[str, Union[int, float, str, List[str]]]

class PredictionResponse(BaseModel):
    predictions: Dict[int, float]

