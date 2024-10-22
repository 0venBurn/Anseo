from fastapi import FastAPI
from services.prediction import PredictionService
from fastapi.middleware.cors import CORSMiddleware
from routers import prediction

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(prediction.router, prefix="/api/v1")
