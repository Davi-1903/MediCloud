import enum
from typing import TYPE_CHECKING

from sqlalchemy import Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.user import User, UserType


if TYPE_CHECKING:
    from models.agenda import Agenda


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

    agenda: Mapped[list['Agenda']] = relationship(back_populates='doctor')

    __mapper_args__ = {'polymorphic_identity': UserType.DOCTOR}
