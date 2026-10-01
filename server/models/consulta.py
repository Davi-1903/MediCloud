import enum
from typing import TYPE_CHECKING
from datetime import date, time
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Date, Time, Enum, Float, String, Text, ForeignKey
from database import Base

if TYPE_CHECKING:
    from models.patient import Patient
    from models.agenda import Agenda
    from models.doctor import Doctor
    from models.prontuario import Prontuario
    from models.prescricao import Prescricao


class StatusType(str, enum.Enum):
    PENDENTE = 'pendente'
    ATENDIDO = 'atendido'
    CANCELADO = 'cancelado'


class Consulta(Base):
    __tablename__ = 'consultas'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    patient_id: Mapped[int] = mapped_column(ForeignKey('patients.id'))
    medico_id: Mapped[int] = mapped_column(ForeignKey('doctors.id'))
    prontuario_id: Mapped[int] = mapped_column(ForeignKey('prontuarios.id'))
    agenda_id: Mapped[int] = mapped_column(ForeignKey('agendas.id'))
    data: Mapped[date] = mapped_column(Date, nullable=True)
    hora: Mapped[time] = mapped_column(Time, nullable=True)
    temperatura: Mapped[float] = mapped_column(Float, nullable=True)
    pressao: Mapped[float] = mapped_column(Float, nullable=True)
    diagnostico: Mapped[str] = mapped_column(String, nullable=True)
    sintomas: Mapped[str] = mapped_column(Text, nullable=True)
    status: Mapped[StatusType] = mapped_column(Enum(StatusType), default=StatusType.PENDENTE, nullable=False)

    patient: Mapped['Patient'] = relationship(back_populates='consultas')
    agenda: Mapped['Agenda'] = relationship(back_populates='consultas')
    doctor: Mapped['Doctor'] = relationship(back_populates='consultas')
    prontuario: Mapped['Prontuario'] = relationship(back_populates='consultas')
    prescricao: Mapped['Prescricao'] = relationship(back_populates='consulta', cascade='all, delete-orphan')