import enum
from turtle import back
from typing import TYPE_CHECKING

from sqlalchemy import Enum, Float, ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


if TYPE_CHECKING:
    from models.consulta import Consulta
    from models.historico_exames import HistoricoExames
    from models.patient import Patient
    from models.prescricao import Prescricao

class SexoType(str, enum.Enum):
    FEMININO = 'feminino'
    MASCULINO = 'masculino'


class SangueType(str, enum.Enum):
    A_POSITIVO = 'A+'
    A_NEGATIVO = 'A-'
    B_POSITIVO = 'B+'
    B_NEGATIVO = 'B-'
    AB_POSITIVO = 'AB+'
    AB_NEGATIVO = 'AB-'
    O_POSITIVO = 'O+'
    O_NEGATIVO = 'O-'


class Prontuario(Base):
    __tablename__ = 'prontuarios'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    patient_id: Mapped[int] = mapped_column(ForeignKey('patients.id'))
    peso: Mapped[float] = mapped_column(Float, nullable=False)
    altura: Mapped[float] = mapped_column(Float, nullable=False)
    alergias: Mapped[str] = mapped_column(Text, nullable=True)
    sexo: Mapped[str] = mapped_column(Enum(SexoType), nullable=True)
    tipo_sanguineo: Mapped[str] = mapped_column(Enum(SangueType), nullable=True)

    patient: Mapped['Patient'] = relationship(back_populates='prontuario', single_parent=True)
    consultas: Mapped[list['Consulta']] = relationship(back_populates='prontuario', cascade='all, delete-orphan')
    prescricoes: Mapped[list['Prescricao']] = relationship(back_populates='prontuario', cascade='all, delete-orphan')
    historico_exames: Mapped[list['HistoricoExames']] = relationship(back_populates='prontuario', cascade='all, delete-orphan')