import datetime

from pydantic import BaseModel, ConfigDict

from models.agenda import HorarioType


class AgendaBase(BaseModel):
    doctor_id: int
    date: datetime.date
    start_time: datetime.time
    end_time: datetime.time
    type: HorarioType


class AgendaCreate(AgendaBase):
    pass


class AgendaRead(AgendaBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
