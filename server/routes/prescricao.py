from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_session
from models.doctor import Doctor
from models.prescricao import Prescricao
from models.prontuario import Prontuario
from models.user import User
from routes.doctor import get_current_doctor
from routes.user import get_current_user
from schemas.prescricao import PrescricaoRead


router = APIRouter(prefix='/prescricoes', tags=['prescricoes'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.get('/{patient_id}', response_model=list[PrescricaoRead])
def get_prescricoes(session: SessionDep, patient_id: int, doctor: Annotated[Doctor, Depends(get_current_doctor)]):
    prescricoes = session.scalars(
        select(Prescricao).join(Prescricao.prontuario).where(Prontuario.patient_id == patient_id)
    ).all()

    if not prescricoes:
        raise HTTPException(status_code=404, detail='Prescrições não encontradas')

    return prescricoes


@router.get('/', response_model=list[PrescricaoRead])
def get_prescricoes_me(session: SessionDep, user: Annotated[User, Depends(get_current_user)]):
    prescricoes = session.scalars(
        select(Prescricao).join(Prescricao.prontuario).where(Prontuario.patient_id == user.id)
    ).all()

    if not prescricoes:
        raise HTTPException(status_code=404, detail='Prescrições não encontradas')

    return prescricoes
