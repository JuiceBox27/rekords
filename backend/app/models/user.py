from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(128), unique=True, index=True, nullable=False)
    password_hash = Column(String)
    # created_at = Column(DateTime(timezone=True), server_default=func.now())

    def to_dict(self):
        return {"id": self.id, "username": self.username}
    
    playlists = relationship("Playlist", back_populates="user", cascade="all, delete-orphan")