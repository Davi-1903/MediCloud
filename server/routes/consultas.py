from collections.abc import Sequence
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_session
from models.consulta import Consulta
from models.user import User
from routes.doctor import get_current_doctor
from routes.user import get_current_user
from schemas.consulta import ConsultaCreate, ConsultaRead


router = APIRouter(prefix='/doctor/appoitments', tags=['Consultas'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.get('', response_model=Sequence[ConsultaRead])
def get_consultas(session: SessionDep, user: Annotated[User, Depends(get_current_user)]):
    return session.scalars(select(Consulta).where(Consulta.medico_id == user.id).order_by(Consulta.hora)).all()


@router.put('/{id}', response_model=ConsultaRead)
def update_consulta(
    session: SessionDep, id: int, new_consulta: ConsultaCreate, doctor: Annotated[User, Depends(get_current_doctor)]
):
    consulta = session.scalar(select(Consulta).where(Consulta.id == id).where(Consulta.medico_id == doctor.id))
    if consulta is None:
        raise HTTPException(status_code=404, detail='Consulta não encontrada')

    try:
        consulta.data = new_consulta.data
        consulta.hora = new_consulta.hora
        session.commit()
        session.refresh(consulta)
        return consulta

    except Exception:
        session.rollback()
        raise HTTPException(status_code=500, detail='Ocorreu um erro interno')


@router.delete('/{id}', response_model=ConsultaRead)
def delete_consulta(session: SessionDep, id: int, user: Annotated[User, Depends(get_current_user)]):
    agenda = session.scalar(select(Consulta).where(Consulta.id == id).where(Consulta.medico_id == user.id))
    if agenda is None:
        raise HTTPException(status_code=404, detail='Agenda não encontrada')

    try:
        session.delete(agenda)
        session.commit()
        return agenda

    except Exception:
        session.rollback()
        raise HTTPException(status_code=500, detail='Ocorreu um erro interno')
