from fastapi import FastAPI

from routers import prediction

app = FastAPI()

app.include_router(prediction.router, prefix="/api/v1")
