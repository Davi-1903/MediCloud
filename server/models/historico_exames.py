from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


if TYPE_CHECKING:
    from models.prontuario import Prontuario

class HistoricoExames(Base):
    __tablename__ = 'historico_exames'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    prontuario_id: Mapped[int] = mapped_column(ForeignKey('prontuarios.id'))
    arquivo: Mapped[str] = mapped_column(String(50), nullable=False) # provisório

    prontuario: Mapped['Prontuario'] = relationship(back_populates='historico_exames')