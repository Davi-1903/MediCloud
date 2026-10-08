from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


if TYPE_CHECKING:
    from models.prescricao import Prescricao

class PrescricaoMedicamento(Base):
    __tablename__ = 'prescricao_medicamentos'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    prescricao_id: Mapped[int] = mapped_column(ForeignKey('prescricoes.id'))
    medicamento: Mapped[str] = mapped_column(Text, nullable=False)
    via: Mapped[str] = mapped_column(String(100), nullable=False)
    posologia: Mapped[str] = mapped_column(String(100), nullable=False)
    duracao: Mapped[str] = mapped_column(String(100), nullable=False)

    prescricao: Mapped['Prescricao'] = relationship(back_populates='prescricao_medicamentos')