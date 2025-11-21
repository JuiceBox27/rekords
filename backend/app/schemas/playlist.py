from pydantic import BaseModel
from datetime import datetime

from .playlist_song import PlaylistSongOut

class PlaylistOut(BaseModel):
    id: int
    user_id: int
    name: str
    created_at: datetime | None = None
    genre: str | None = None
    bpm_from: int | None = None
    bpm_to: int | None = None
    description: str | None = None

    playlist_songs: list[PlaylistSongOut]

    class Config:
        from_attributes = True   # IMPORTANT for Pydantic v2
