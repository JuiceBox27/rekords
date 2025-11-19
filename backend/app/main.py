from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.api.users import router as users_router
from app.api.playlists import router as playlists_router

app = FastAPI(
    title="Rekords",
    version="0.1.0"
)

# Allow Vite dev server (and other local origins) during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(playlists_router)

@app.get("/")
def read_root():
    return {"status": "ok", "msg": "hot reload works!"}
