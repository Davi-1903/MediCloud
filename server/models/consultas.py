import enum
from sqlalchemy.orm import Mapped, mapped_column
from datetime import date, time
from sqlalchemy import Date, Time, Enum, Float, String, Text
from database import Base

class StatusType(str, enum.Enum):
    PENDENTE = 'pendente'
    ATENDIDO = 'atendido'
    CANCELADO = 'cancelado'

class Consulta(Base):
    __tablename__ ='consultas'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    data: Mapped[date] = mapped_column(Date)
    hora: Mapped[time] = mapped_column(Time)
    temperatura: Mapped[float] = mapped_column(Float)
    pressao: Mapped[float] = mapped_column(Float)
    diagnostico: Mapped[str] = mapped_column(String)
    sintomas: Mapped[str] = mapped_column(Text)
    status: Mapped[StatusType] = mapped_column(Enum(StatusType)) 
    


'''
    prescrição:
        - medicamento
        - via
        - posologia
        - duracao
'''