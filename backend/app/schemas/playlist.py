from pydantic import BaseModel
from datetime import datetime

class PlaylistOut(BaseModel):
    id: int
    user_id: int
    name: str
    created_at: datetime | None = None

    genre: str | None = None
    bpm_from: int | None = None
    bpm_to: int | None = None
    description: str | None = None

    class Config:
        from_attributes = True   # IMPORTANT for Pydantic v2