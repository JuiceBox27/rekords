from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Rekords",
    version="0.1.0"
)

@app.get("/")
def read_root():
    return {"status": "ok", "msg": "hot reload works!"}