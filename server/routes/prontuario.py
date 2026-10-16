from collections.abc import Sequence
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_session
from models.doctor import Doctor, Status
from models.prontuario import Prontuario
from models.user import User, UserType
from routes.doctor import get_current_doctor
from routes.user import get_current_user
from schemas.prontuario import ProntuarioCreate, ProntuarioRead


router = APIRouter(prefix='/prontuario', tags=['Prontuario'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.get('/', response_model=Sequence[ProntuarioRead])
def get_prontuario(session: SessionDep, user: Annotated[User, Depends(get_current_user)]):
    return session.scalars(select(Prontuario).where(Prontuario.patient_id == user.id)).all()


@router.post('', response_model=ProntuarioRead, status_code=201)
def create_prontuario(session: SessionDep, doctor: Annotated[Doctor, Depends(get_current_doctor)]):
    try:
        new_prontuario = Prontuario(
            peso=Prontuario.peso,
            altura=Prontuario.altura,
            alergias=Prontuario.alergias,
            sexo=Prontuario.sexo,
            tipo_sanguineo=Prontuario.tipo_sanguineo,
            patient_id=Prontuario.patient_id,
        )
        session.add(prontuario)
        session.commit()
        return prontuario

    except Exception:
        session.rollback()
        raise HTTPException(status_code=500, detail='Ocorreu um erro interno')


@router.put('/{prontuario_id}', response_model=ProntuarioRead)
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
