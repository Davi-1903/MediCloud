"""adicionar idx no users

Revision ID: 4c0bb3cd3786
Revises: ae4aaa2326ef
Create Date: 2026-10-19 16:37:32.554224

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4c0bb3cd3786'
down_revision: Union[str, Sequence[str], None] = 'ae4aaa2326ef'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
