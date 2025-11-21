from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db import Base
from app.models.playlist_song import PlaylistSong

class Playlist(Base):
    __tablename__ = "playlists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    genre = Column(String(100))
    bpm_from = Column(Integer)
    bpm_to = Column(Integer)
    description = Column(Text)

    # optional, makes backref available
    user = relationship("User", back_populates="playlists")

    playlist_songs = relationship("PlaylistSong", back_populates="playlist", cascade="all, delete-orphan", order_by="PlaylistSong.position")