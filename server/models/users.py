from database import Base
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    tipo: Mapped[str] = mapped_column(String(50), nullable=False)
    nome: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    senha: Mapped[str] = mapped_column(String(255), nullable=False)
    telefone: Mapped[str] = mapped_column(String(15))
    rua: Mapped[str] = mapped_column(String(150))
    bairro: Mapped[str] = mapped_column(String(150))
    numero: Mapped[int] = mapped_column()
    cidade: Mapped[str] = mapped_column(String(150))
    cep: Mapped[str] = mapped_column(String(8))

    __mapper_args__ = {
        "polymorphic_identity": "user",
        "polymorphic_on": tipo
    }


class Medico(User):
    __tablename__ = "medicos"

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    crm: Mapped[str] = mapped_column(String(20), nullable=False)
    especialidade: Mapped[str] = mapped_column(String(100))

    __mapper_args__ = {
        "polymorphic_identity": "medico"
    }


class Paciente(User):
    __tablename__ = "pacientes"

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": "paciente"
    }


class Administrador(User):
    __tablename__ = "administradores"

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": "admin"
    }