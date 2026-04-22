from database import Base
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped

class Users(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    senha: Mapped[str] = mapped_column(String(400), nullable=False)
    tipo: Mapped[str] = mapped_column(String(50), nullable=False)

    rua: Mapped[str] = mapped_column(String(150), nullable=False)
    bairro: Mapped[str] = mapped_column(String(150), nullable=False)
    cidade: Mapped[str] = mapped_column(String(150), nullable=False)
    cep: Mapped[str] = mapped_column(String(9), nullable=False)
    telefone: Mapped[str] = mapped_column(String(15), nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'user',
        'polymorphic_on': tipo
    }

    def get_id(self):
        return str(self.id)

class Clinicas(Users):
    __tablename__ = 'clinicas'

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    instagram: Mapped[str] = mapped_column(String(100))
    facebook: Mapped[str] = mapped_column(String(100))

    __mapper_args__ = {
        'polymorphic_identity': 'clinica'
    }


class Pacientes(Users):
    __tablename__ = 'pacientes'

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)

    __mapper_args__ = {
        'polymorphic_identity': 'paciente'
    }


class Administradores(Users):
    __tablename__ = 'administradores'

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)

    __mapper_args__ = {
        'polymorphic_identity': 'administrador'
    }