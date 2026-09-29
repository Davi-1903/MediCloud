from datetime import time

from pydantic import BaseModel, ConfigDict

from models.agenda import Days


class AgendaBase(BaseModel):
    doctor_id: int
    date: Days
    start_time: time
    end_time: time


class AgendaCreate(AgendaBase):
    pass


class AgendaRead(AgendaBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
