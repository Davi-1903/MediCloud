from datetime import date
import enum
from sqlalchemy import Date, Enum, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from database import Base


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
    tel: Mapped[str] = mapped_column(String)
    cpf: Mapped[str] = mapped_column(String(11))
    birth_date: Mapped[date] = mapped_column(Date)
    street: Mapped[str] = mapped_column(String)
    city: Mapped[str] = mapped_column(String)
    state: Mapped[str] = mapped_column(String)
    number: Mapped[int] = mapped_column(Integer)
    cep: Mapped[str] = mapped_column(String(8))

    __mapper_args__ = {'polymorphic_on': 'type', 'polymorphic_identity': None}
