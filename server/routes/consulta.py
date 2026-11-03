from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_session
from models.consulta import Consulta
from models.doctor import Doctor
from models.user import User
from routes.doctor import get_current_doctor
from routes.user import get_current_user
from schemas.consulta import ConsultaRead


router = APIRouter(prefix='/consultas', tags=['consultas'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.get('/{patient_id}', response_model=list[ConsultaRead])
def get_consultas(session: SessionDep, patient_id: int, doctor: Annotated[Doctor, Depends(get_current_doctor)]):
    consultas = session.scalars(select(Consulta).where(Consulta.patient_id == patient_id)).all()

    if not consultas:
        raise HTTPException(status_code=404, detail='Consultas não encontradas')

    return consultas

@router.get('/', response_model=list[ConsultaRead])
def get_consultas_me(session: SessionDep, user: Annotated[User, Depends(get_current_user)]):
    consultas = session.scalars(select(Consulta).where(Consulta.patient_id == user.id)).all()

    if not consultas:
        raise HTTPException(status_code=404, detail='Consultas não encontradas')

    return consultas
