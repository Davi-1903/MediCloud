import enum
from typing import TYPE_CHECKING
from sqlalchemy import Integer, Float, Text, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

if TYPE_CHECKING:
    from models.user import User


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
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    idade: Mapped[int] = mapped_column(Integer, nullable=False)
    peso: Mapped[float] = mapped_column(Float, nullable=False)
    altura: Mapped[float] = mapped_column(Float, nullable=False)
    alergias: Mapped[str] = mapped_column(Text, nullable=True)
    sexo: Mapped[str] = mapped_column(Enum(SexoType), nullable=True)
    tipo_sanguineo: Mapped[str] = mapped_column(Enum(SangueType), nullable=True)

    user: Mapped['User'] = relationship(back_populates='prontuario', single_parent=True)
