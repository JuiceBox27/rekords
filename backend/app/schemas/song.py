from pydantic import BaseModel
from datetime import datetime


class SongBase(BaseModel):
    id: int
    title: str | None = None
    artist: str | None = None
    album: str | None = None
    duration: int | None = None
    bpm: int | None = None
    genre: str | None = None
    created_at: datetime | None = None

    class Config:
        orm_mode = True
