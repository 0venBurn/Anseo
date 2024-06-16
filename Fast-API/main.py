from fastapi import FastAPI

from routers import hello, prediction

app = FastAPI()

app.include_router(prediction.router, prefix="/api/v1")
app.include_router(hello.router, prefix="/api/v1")
