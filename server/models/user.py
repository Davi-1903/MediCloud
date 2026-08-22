import enum
from sqlalchemy import Enum, String
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

    __mapper_args__ = {'polymorphic_on': 'type', 'polymorphic_identity': None}
