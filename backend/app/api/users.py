from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta
from app.db import get_db
from app.crud.user import get_user_by_username
from app.schemas.user import UserSchema

SECRET_KEY = "test_key_for_jwt_token_generation"
ALGORITHM = "HS256"

router = APIRouter()
security = HTTPBearer()

# Create JWT for test user
def create_test_jwt():
    payload = {
        "sub": "test2",
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    token = jwt.encode(claims=payload, key=SECRET_KEY, algorithm=ALGORITHM)
    return token

# Decode/verify JWT
def get_current_user(
        credentials: HTTPAuthorizationCredentials = Depends(security),
        db: Session = Depends(get_db)
) -> UserSchema:
    try:
        payload = jwt.decode(credentials.credentials, key=SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = get_user_by_username(db, username)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
@router.get("/api/auth/token")
def get_token():
    return {"token": create_test_jwt()}


@router.get("/api/me", response_model=UserSchema)
def read_me(user: UserSchema = Depends(get_current_user)):
    return user