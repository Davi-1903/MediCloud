from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, String, Integer, Text
from sqlalchemy.orm import mapped_column, Mapped, relationship
from database import Base

if TYPE_CHECKING:
    from models.user import User


class Prescricao(Base):
    __tablename__ = 'prescricoes'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    medicamento: Mapped[str] = mapped_column(String, nullable=False)
    via: Mapped[str] = mapped_column(String, nullable=False)
    posologia: Mapped[str] = mapped_column(String, nullable=False)
    duracao: Mapped[int] = mapped_column(Integer, nullable=False)
    observacoes: Mapped[str] = mapped_column(Text, nullable=False)
    exames: Mapped[str] = mapped_column(Text, nullable=True)

    user: Mapped['User'] = relationship(back_populates='prescricoes')