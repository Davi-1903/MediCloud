"""descrição da migração

Revision ID: ae4aaa2326ef
Revises: 4c87f76d98f7
Create Date: 2026-10-19 16:37:09.935443

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ae4aaa2326ef'
down_revision: Union[str, Sequence[str], None] = '4c87f76d98f7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
