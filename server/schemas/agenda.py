import datetime

from pydantic import BaseModel, ConfigDict

from models.agenda import Days, HorarioType


class AgendaBase(BaseModel):
    date: Days
    start_time: datetime.time
    end_time: datetime.time
    type: HorarioType


class AgendaCreate(AgendaBase):
    pass


class AgendaRead(AgendaBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
