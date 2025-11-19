"""create playlists table

Revision ID: 11e586b9e05c
Revises: d933a7e14469
Create Date: 2025-11-18 15:37:53.998337

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '11e586b9e05c'
down_revision: Union[str, Sequence[str], None] = 'd933a7e14469'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "playlists",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("genre", sa.String(length=100)),
        sa.Column("bpm_from", sa.Integer),
        sa.Column("bpm_to", sa.Integer),
        sa.Column("description", sa.Text)
    )

def downgrade():
    op.drop_table("playlists")