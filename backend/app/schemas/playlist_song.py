from pydantic import BaseModel
from datetime import datetime
from .song import SongBase

class PlaylistSongOut(BaseModel):
    playlist_id: int
    song_id: int
    position: int
    user_id: int | None = None
    added_at: datetime

    song: SongBase   # <-- nested song object

    class Config:
        from_attributes = True