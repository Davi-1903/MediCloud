from collections.abc import Sequence
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_session
from models.agenda import Agenda
from models.user import User, UserType
from schemas.agenda import AgendaCreate, AgendaRead
from .user import get_current_user


router = APIRouter(prefix='/doctor/schedule', tags=['Agenda'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.get('', response_model=Sequence[AgendaRead])
def get_agendas(session: SessionDep, user: Annotated[User, Depends(get_current_user)]):
    if user.type != UserType.DOCTOR:
        raise HTTPException(status_code=401, detail='Esses dados só podem ser acessador por um médico')
    return session.scalars(select(Agenda).where(Agenda.id == user.id)).all()


@router.post('', response_model=AgendaRead, status_code=201)
def create_agenda(session: SessionDep, user: Annotated[User, Depends(get_current_user)], agenda: AgendaCreate):
    if user.type != UserType.DOCTOR:
        raise HTTPException(status_code=401, detail='Esses dados só podem ser acessador por um médico')

    try:
        new_agenda = Agenda(
            date=agenda.date,
            start_time=agenda.start_time,
            end_time=agenda.end_time,
            doctor_id=user.id,
        )
        session.add(new_agenda)
        session.commit()
        session.refresh(new_agenda)
        return new_agenda

    except Exception as err:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(err))
