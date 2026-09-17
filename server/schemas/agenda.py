from datetime import time

from pydantic import BaseModel

from models.agenda import Days


class AgendaModel(BaseModel):
    id: int
    doctor_id: int
    date: Days
    start_time: time
    end_time: time
