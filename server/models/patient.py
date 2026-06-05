from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from models.user import User, UserType


class Patient(User):
    __tablename__ = 'patients'

    id: Mapped[int] = mapped_column(ForeignKey('users.id'), primary_key=True, nullable=False)

    __mapper_args__ = {'polymorphic_identity': UserType.PATIENT}
