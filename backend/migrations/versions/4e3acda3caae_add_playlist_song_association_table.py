"""add playlist_song association table

Revision ID: 4e3acda3caae
Revises: 678b309cfe8e
Create Date: 2025-11-19 14:49:02.883471

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4e3acda3caae'
down_revision: Union[str, Sequence[str], None] = '678b309cfe8e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "playlist_song",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),

        sa.Column("playlist_id", sa.Integer(), sa.ForeignKey("playlists.id"), primary_key=True),
        sa.Column("song_id", sa.Integer(), sa.ForeignKey("songs.id"), primary_key=True),

        sa.Column("position", sa.Integer(), nullable=False),
        sa.Column("added_at", sa.DateTime(), server_default=sa.func.now(), nullable=False)
    )

    # Make querying by playlist fast
    op.create_index("ix_playlist_song_playlist_id", "playlist_song", ["playlist_id"])
    op.create_index("ix_playlist_song_song_id", "playlist_song", ["song_id"])


def downgrade():
    op.drop_index("ix_playlist_song_playlist_id", table_name="playlist_song")
    op.drop_index("ix_playlist_song_song_id", table_name="playlist_song")

    op.drop_table("playlist_song")