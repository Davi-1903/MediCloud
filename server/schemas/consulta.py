from datetime import date, time

from pydantic import BaseModel, ConfigDict

from models.consulta import StatusType


class ConsultaBase(BaseModel):
    patient_id: int
    medico_id: int
    prontuario_id: int
    agenda_id: int
    data: date | None = None
    hora: time | None = None
    temperatura: float | None = None
    pressao: float | None = None
    diagnostico: str | None = None
    sintomas: str | None = None
    status: StatusType = StatusType.PENDENTE


class ConsultaCreate(ConsultaBase):
    pass


class ConsultaRead(ConsultaBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
