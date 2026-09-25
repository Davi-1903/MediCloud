import enum
from datetime import date
from typing import TYPE_CHECKING
from sqlalchemy import Date, Enum, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

if TYPE_CHECKING:
    from models.pronturario import Prontuario
    from models.prescricao import Prescricao
    from models.consulta import Consulta

class UserType(str, enum.Enum):
    ADMIN = 'administrator'
    DOCTOR = 'doctor'
    PATIENT = 'patient'


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(150), nullable=False, unique=True, index=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[UserType] = mapped_column(Enum(UserType), nullable=False)
    tel: Mapped[str] = mapped_column(String, nullable=True)
    cpf: Mapped[str] = mapped_column(String(11), nullable=True)
    birth_date: Mapped[date] = mapped_column(Date, nullable=True)
    street: Mapped[str] = mapped_column(String, nullable=True)
    city: Mapped[str] = mapped_column(String, nullable=True)
    state: Mapped[str] = mapped_column(String, nullable=True)
    number: Mapped[int] = mapped_column(Integer, nullable=True)
    cep: Mapped[str] = mapped_column(String(8), nullable=True)

    prontuario: Mapped['Prontuario'] = relationship(back_populates='user', cascade='all, delete-orphan', uselist=False)
    precricoes: Mapped[list['Prescricao']] = relationship(back_populates='user', cascade='all, delete-orphan')
    consultas: Mapped[list['Consulta']] = relationship(back_populates='user', cascade='all, delete-orphan')

    __mapper_args__ = {'polymorphic_on': 'type', 'polymorphic_identity': None}
