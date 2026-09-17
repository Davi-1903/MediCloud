from collections.abc import Sequence
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_session
from models.agenda import Agenda
from models.user import User
from schemas.agenda import AgendaModel
from .user import get_current_user


router = APIRouter(prefix='/doctor/schedule', tags=['Agenda'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.get('', response_model=Sequence[AgendaModel])
def get_agendas(session: SessionDep, user: Annotated[User, Depends(get_current_user)]):
    return session.scalars(select(Agenda).where(Agenda.id == user.id)).all()
