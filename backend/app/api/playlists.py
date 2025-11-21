from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.playlist import PlaylistOut
from app.crud.playlist import get_playlists_by_user, get_playlist_with_songs
from app.schemas.playlist_song import PlaylistSongOut
from app.api.users import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/api/library/playlists", response_model=list[PlaylistOut])
def get_user_playlists(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_playlists_by_user(db, user.id)

@router.get("/api/library/playlists/{playlist_id}", response_model=PlaylistOut)
def get_playlist_songs(playlist_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    playlist = get_playlist_with_songs(db, user.id, playlist_id)
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    return playlist

@router.get("/api/library/playlists/{playlist_id}/songs", response_model=list[PlaylistSongOut])
def get_playlist_song_list(playlist_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    playlist = get_playlist_with_songs(db, user.id, playlist_id)
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    return playlist.playlist_songs