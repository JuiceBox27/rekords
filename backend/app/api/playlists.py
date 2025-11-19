from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.playlist import PlaylistOut
from app.crud.playlist import get_playlists_by_user

router = APIRouter()

@router.get("/api/library/playlists", response_model=list[PlaylistOut])
def get_user_playlists(user_id: int, db: Session = Depends(get_db)):
    return get_playlists_by_user(db, user_id)