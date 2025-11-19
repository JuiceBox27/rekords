from sqlalchemy.orm import Session
from app.models.playlist import Playlist

def get_playlists_by_user(db: Session, user_id: int):
    return db.query(Playlist).filter(Playlist.user_id == user_id).all()