from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from database import get_session
from models.doctor import Doctor, Status
from models.prontuario import Prontuario
from models.user import User, UserType
from routes.doctor import get_current_doctor
from routes.user import get_current_user
from schemas.prontuario import ProntuarioCreate, ProntuarioRead


router = APIRouter(prefix='/prontuario', tags=['Prontuario'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.get('/{patient_id}', response_model=ProntuarioRead)
def get_prontuario(session: SessionDep, patient_id: int, doctor: Annotated[User, Depends(get_current_doctor)]):
    prontuario = session.scalars(select(Prontuario).where(Prontuario.patient_id == patient_id)).first()
    
    if prontuario is None:
        raise HTTPException(status_code=404, detail='Prontuário ou paciente não existentes')
    
    return prontuario

@router.get('', response_model=ProntuarioRead)
def get_prontuario_me(session: SessionDep, user: Annotated[User, Depends(get_current_user)]):
    prontuario = session.scalars(
        select(Prontuario)
        .where(Prontuario.patient_id == user.id)
    ).first()
    
    if prontuario is None:
        raise HTTPException(status_code=404, detail='Prontuário não encontrado')
    
    return prontuario

# revisar
@router.put('/{id}', response_model=ProntuarioRead)
def update_prontuario(
    session: SessionDep, id: int, new_prontuario: ProntuarioCreate, user: Annotated[User, Depends(get_current_user)]
):
    prontuario = session.get(Prontuario, id)
    if not prontuario:
        raise HTTPException(status_code=404, detail='Prontuário não encontrado')

    if (
        user.type != UserType.DOCTOR
        or user.status != Status.ACTIVE
        or (user.type != UserType.PATIENT and user.id != Prontuario.patient_id)
    ):
        raise HTTPException(
            status_code=401,
            detail='Esses dados só podem ser acessados por um médico ou o paciente pertencente do prontuário',
        )

    try:
        prontuario.peso = new_prontuario.peso
        prontuario.altura = new_prontuario.altura
        prontuario.alergias = new_prontuario.alergias
        prontuario.sexo = new_prontuario.sexo
        prontuario.tipo_sanguineo = new_prontuario.tipo_sanguineo
        session.commit()
        session.refresh(prontuario)
        return prontuario

    except Exception:
        session.rollback()
        raise HTTPException(status_code=500, detail='Ocorreu um erro interno')

