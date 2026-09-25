import enum
from typing import TYPE_CHECKING
from datetime import date, time
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Date, Time, Enum, Float, String, Text, ForeignKey
from database import Base

if TYPE_CHECKING:
    from models.user import User


class StatusType(str, enum.Enum):
    PENDENTE = 'pendente'
    ATENDIDO = 'atendido'
    CANCELADO = 'cancelado'

class Consulta(Base):
    __tablename__ ='consultas'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    data: Mapped[date] = mapped_column(Date, nullable=True)
    hora: Mapped[time] = mapped_column(Time, nullable=True)
    temperatura: Mapped[float] = mapped_column(Float, nullable=True)
    pressao: Mapped[float] = mapped_column(Float, nullable=True)
    diagnostico: Mapped[str] = mapped_column(String, nullable=True)
    sintomas: Mapped[str] = mapped_column(Text, nullable=True)
    status: Mapped[StatusType] = mapped_column(Enum(StatusType), default=StatusType.PENDENTE, nullable=False) 

    user: Mapped['User'] = relationship(back_populates='consulta')