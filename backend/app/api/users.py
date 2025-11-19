from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.crud.user import get_user_by_username

router = APIRouter()

@router.get("/api/me")
def read_me(db: Session = Depends(get_db)):
    user = get_user_by_username(db, "test1")
    if not user:
        return {"error": "User not found"}
    return {"id": user.id, "username": user.username}