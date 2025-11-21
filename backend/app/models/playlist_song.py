from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import sqlalchemy as sa

from app.db import Base
from app.models.song import Song

class PlaylistSong(Base):
    __tablename__ = "playlist_song"

    playlist_id = Column(Integer, ForeignKey("playlists.id", ondelete="CASCADE"), nullable=False)
    song_id = Column(Integer, ForeignKey("songs.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    position = Column(Integer, nullable=False)
    added_at = Column(DateTime, server_default=sa.func.now(), nullable=False)

    __table_args__ = (
        sa.PrimaryKeyConstraint("playlist_id", "song_id", "position"),
    )

    playlist = relationship("Playlist", back_populates="playlist_songs")
    song = relationship("Song", back_populates="playlist_entries")