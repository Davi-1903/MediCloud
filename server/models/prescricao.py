from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


if TYPE_CHECKING:
    from models.consulta import Consulta
    from models.prescricao_medicamento import PrescricaoMedicamento
    from models.prontuario import Prontuario


class Prescricao(Base):
    __tablename__ = 'prescricoes'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    prontuario_id: Mapped[int] = mapped_column(ForeignKey('prontuarios.id'))
    consulta_id: Mapped[int] = mapped_column(ForeignKey('consultas.id'))
    observacoes: Mapped[str] = mapped_column(Text, nullable=False)
    exames: Mapped[str] = mapped_column(Text, nullable=True)

    prontuario: Mapped['Prontuario'] = relationship(back_populates='prescricoes')
    consulta: Mapped['Consulta'] = relationship(back_populates='prescricao')
    prescricao_medicamentos: Mapped[list['PrescricaoMedicamento']] = relationship(back_populates='prescricao', cascade='all, delete-orphan')