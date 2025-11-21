from sqlalchemy.orm import Session
from app.models.playlist import Playlist

def get_playlists_by_user(db: Session, user_id: int):
    return db.query(Playlist).filter(Playlist.user_id == user_id).all()

def get_playlist_by_id(db: Session, playlist_id: int):
    return db.query(Playlist).filter(Playlist.id == playlist_id).first()

def get_playlist_with_songs(db: Session, user_id: int, playlist_id: int):
    return db.query(Playlist).filter(Playlist.user_id == user_id).filter(Playlist.id == playlist_id).first()