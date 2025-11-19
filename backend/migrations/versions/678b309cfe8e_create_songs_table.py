"""create songs table

Revision ID: 678b309cfe8e
Revises: 11e586b9e05c
Create Date: 2025-11-18 15:40:37.480808

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '678b309cfe8e'
down_revision: Union[str, Sequence[str], None] = '11e586b9e05c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "songs",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("artist", sa.String(length=255)),
        sa.Column("album", sa.String(length=255)),
        sa.Column("duration", sa.Integer),  # seconds
        sa.Column("bpm", sa.Integer),
        sa.Column("genre", sa.String(length=100)),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now())
    )

def downgrade():
    op.drop_table("songs")