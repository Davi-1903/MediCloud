from datetime import time
import enum
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Enum, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


if TYPE_CHECKING:
    from models.doctor import Doctor


class Days(enum.Enum):
    SEGUNDA = 'segunda'
    TERCA = 'terça'
    QUARTA = 'quarta'
    QUINTA = 'quinta'
    SEXTA = 'sexta'


class Agenda(Base):
    __tablename__ = 'agenda'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    doctor_id: Mapped[int] = mapped_column(ForeignKey('doctors.id'), nullable=False)
    date: Mapped[Days] = mapped_column(Enum(Days), nullable=False)
    start_time: Mapped[time] = mapped_column(Time, nullable=False)
    end_time: Mapped[time] = mapped_column(Time, nullable=False)

    doctor: Mapped['Doctor'] = relationship(back_populates='agenda')
