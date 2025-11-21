from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db import Base

class Song(Base):
    __tablename__ = "songs"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    artist = Column(String, nullable=False)
    album = Column(String, nullable=False)
    duration = Column(Integer, nullable=False)
    bpm = Column(Integer, nullable=False)
    genre = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    playlist_entries = relationship("PlaylistSong", back_populates="song", cascade="all, delete-orphan")