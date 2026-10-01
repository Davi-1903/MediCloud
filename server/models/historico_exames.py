from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import String, ForeignKey
from typing import TYPE_CHECKING
from database import Base

if TYPE_CHECKING:
    from models.prontuario import Prontuario

class HistoricoExames(Base):
    __tablename__ = 'historico_exames'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    prontuario_id: Mapped[int] = mapped_column(ForeignKey('prontuarios.id'))
    arquivo: Mapped[str] = mapped_column(String(50), nullable=False) # provisório

    prontuario: Mapped['Prontuario'] = relationship(back_populates='historico_exames')