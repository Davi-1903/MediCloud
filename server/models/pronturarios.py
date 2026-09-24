import enum
from sqlalchemy import Integer, Float, String, Text, Enum, null
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

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
    idade: Mapped[int] = mapped_column(Integer, nullable=False)
    peso: Mapped[float] = mapped_column(Float, nullable=False)
    altura: Mapped[float] = mapped_column(Float, nullable=False)
    alergias: Mapped[str] = mapped_column(Text, default='Não contém alergia')
    sexo: Mapped[str] = mapped_column(Enum(SexoType), default='Não identificado')
    tipo_sanguineo: Mapped[str] = mapped_column(Enum(SangueType), default='Não informado')
    

#   historico: Mapped['Historico'] = relationship(
#         back_populates='material', uselist=False, cascade='all, delete-orphan'
#     ) 