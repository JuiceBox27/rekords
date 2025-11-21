"""add user_id to playlist_song

Revision ID: 0d91031b7c4c
Revises: 4e3acda3caae
Create Date: 2025-11-19 16:01:25.409830

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0d91031b7c4c'
down_revision: Union[str, Sequence[str], None] = '4e3acda3caae'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Add user_id column
    op.add_column(
        "playlist_song",
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    )

    # Optional: create an index for faster queries
    op.create_index("ix_playlist_song_user_id", "playlist_song", ["user_id"])


def downgrade():
    op.drop_index("ix_playlist_song_user_id", table_name="playlist_song")
    op.drop_column("playlist_song", "user_id")