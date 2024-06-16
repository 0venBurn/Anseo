from fastapi import APIRouter, Depends
from schemas.prediction import PredictionRequest, PredictionResponse
from services.prediction import PredictionService

router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
def predict(
    request: PredictionRequest, prediction_service: PredictionService = Depends()
):
    predictions = prediction_service.predict(request.data)
    return PredictionResponse(predictions=predictions.tolist())
