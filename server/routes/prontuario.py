from typing import Annotated
from collections.abc import Sequence
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import get_session
from models.prontuario import Prontuario
from models.user import User, UserType
from schemas.prontuario import ProntuarioCreate, ProntuarioRead, ProntuarioUpdate
from .user import get_current_user


router = APIRouter(prefix='/prontuario', tags=['Prontuario'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.get('/', response_model=Sequence[ProntuarioRead])
def get_prontuario(session: SessionDep, user: Annotated[User, Depends(get_current_user)]):
    return session.scalars(select(Prontuario).where(Prontuario.id == user.id)).all()


@router.post('/{patient_id}', response_model=ProntuarioRead, status_code=201)
def create_prontuario(
    session: SessionDep, user: Annotated[User, Depends(get_current_user)], patient_id: int, data: ProntuarioCreate
):
    if user.type != UserType.DOCTOR:
        raise HTTPException(status_code=401, detail='Esses dados só podem ser acessados por um médico')

    existing = session.scalars(select(Prontuario).where(Prontuario.patient_id == patient_id)).first()

    if existing:
        raise HTTPException(status_code=409, detail='O prontuário ja existe')

    try:
        prontuario = Prontuario(
            peso=data.peso,
            altura=data.altura,
            alergias=data.alergias,
            sexo=data.sexo,
            tipo_sanguineo=data.tipo_sanguineo,
            patient_id=patient_id,
        )
        session.add(prontuario)
        session.commit()
        return prontuario

    except Exception:
        session.rollback()
        raise HTTPException(status_code=500, detail='Ocorreu um erro interno')


@router.put('/{prontuario_id}', response_model=ProntuarioRead)
def update_prontuario(
    session: SessionDep,
    prontuario_id: int,
    new_prontuario: ProntuarioUpdate,
    user: Annotated[User, Depends(get_current_user)],
):
    if user.type != UserType.DOCTOR:
        raise HTTPException(status_code=401, detail='Esses dados só podem ser acessados por um médico')

    prontuario = session.scalar(
        select(Prontuario)
        .where(Prontuario.id == prontuario_id)
    ) # provisório, precisa ver a questão do médico

    if prontuario is None:
        raise HTTPException(status_code=404, detail='Prontuário não encontrado')

    try:
        prontuario.peso = new_prontuario.peso or prontuario.peso
        prontuario.altura = new_prontuario.altura or prontuario.altura
        prontuario.alergias = new_prontuario.alergias or prontuario.alergias
        prontuario.sexo = new_prontuario.sexo or prontuario.sexo
        prontuario.tipo_sanguineo = new_prontuario.tipo_sanguineo or prontuario.tipo_sanguineo
         
        session.commit()
        session.refresh(prontuario)
        return prontuario

    except Exception:
        session.rollback()
        raise HTTPException(status_code=500, detail='Ocorreu um erro interno')
