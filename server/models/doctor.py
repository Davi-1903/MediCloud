import enum

from sqlalchemy import Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from models.user import User, UserType


class Status(enum.Enum):
    PENDING = 'pending'
    ACTIVE = 'active'
    INACTIVE = 'inactive'


class Doctor(User):
    __tablename__ = 'doctors'

    id: Mapped[int] = mapped_column(ForeignKey('users.id'), primary_key=True, nullable=False)
    specialty: Mapped[str] = mapped_column(String(100), nullable=False)
    crm: Mapped[str] = mapped_column(String(50), index=True, nullable=False)
    status: Mapped[Status] = mapped_column(Enum(Status), default=Status.PENDING, nullable=False)

    __mapper_args__ = {'polymorphic_identity': UserType.DOCTOR}
