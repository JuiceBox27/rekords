"""drop id from playlist_song and create pk

Revision ID: a20e1b8ef1d9
Revises: 0d91031b7c4c
Create Date: 2025-11-19 16:07:18.652845

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a20e1b8ef1d9'
down_revision: Union[str, Sequence[str], None] = '0d91031b7c4c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Drop the id column
    op.drop_column("playlist_song", "id")

    # Set composite primary key
    op.create_primary_key(
        "pk_playlist_song",
        "playlist_song",
        ["playlist_id", "song_id", "position"]
    )


def downgrade():
    # Remove composite PK
    op.drop_constraint("pk_playlist_song", "playlist_song", type_="primary")

    # Add id column back
    op.add_column(
        "playlist_song",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True)
    )