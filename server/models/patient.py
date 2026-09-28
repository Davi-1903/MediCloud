from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from models.user import User, UserType

if TYPE_CHECKING:
    from models.consulta import Consulta
    from models.prontuario import Prontuario

class Patient(User):
    __tablename__ = 'patients'

    id: Mapped[int] = mapped_column(ForeignKey('users.id'), primary_key=True, nullable=False)

    consultas: Mapped[list['Consulta']] = relationship(back_populates='patient', cascade='all, delete-orphan')
    prontuario: Mapped['Prontuario'] = relationship(back_populates='patient', cascade='all, delete-orphan', uselist=False)

    
    __mapper_args__ = {'polymorphic_identity': UserType.PATIENT}
