import datetime
import enum
from typing import TYPE_CHECKING

from sqlalchemy import Enum, ForeignKey, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


if TYPE_CHECKING:
    from models.consulta import Consulta
    from models.doctor import Doctor


class Days(enum.Enum):
    DOMINGO = 'domingo'
    SEGUNDA = 'segunda'
    TERCA = 'terça'
    QUARTA = 'quarta'
    QUINTA = 'quinta'
    SEXTA = 'sexta'
    SABADO = 'sábado'


class HorarioType(str, enum.Enum):
    ONLINE = 'online'
    PRESENCIAL = 'presencial'


class Agenda(Base):
    __tablename__ = 'agendas'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    doctor_id: Mapped[int] = mapped_column(ForeignKey('doctors.id'), nullable=False)
    date: Mapped[Days] = mapped_column(Enum(Days), nullable=False)
    start_time: Mapped[datetime.time] = mapped_column(Time, nullable=False)
    end_time: Mapped[datetime.time] = mapped_column(Time, nullable=False)
    type: Mapped[HorarioType] = mapped_column(Enum(HorarioType), nullable=False)

    doctor: Mapped['Doctor'] = relationship(back_populates='agenda')
    consultas: Mapped[list['Consulta']] = relationship(back_populates='agenda', cascade='all, delete-orphan')
