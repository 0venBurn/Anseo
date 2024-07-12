from fastapi import APIRouter, Depends
from schemas.prediction import PredictionRequest, PredictionResponse
from services.prediction import PredictionService

router = APIRouter()

@router.post("/predict")
def predict(
    request: PredictionRequest, prediction_service: PredictionService = Depends()
):  
    
    # Calls the prediction service to get the model's predictions
    predictions = prediction_service.predict(request)
    
    # Returns a dictionary of key/value pairs where the key is the zipcode and the value is the probability
    return PredictionResponse(predictions=predictions)
