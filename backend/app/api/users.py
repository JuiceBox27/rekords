from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.crud.user import get_user_by_username

router = APIRouter()

@router.get("/api/me")
def read_me(
    username: str,                      # <-- comes from query param ?username=
    db: Session = Depends(get_db)       # <-- dependency injection must come after
):
    user = get_user_by_username(db, username)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"id": user.id, "username": user.username}