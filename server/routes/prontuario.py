from collections.abc import Sequence
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_session
from models.consulta import Consulta
from models.doctor import Doctor
from models.prontuario import Prontuario
from models.user import User, UserType
from schemas.prontuario import ProntuarioCreate, ProntuarioRead

from .user import get_current_user


router = APIRouter(prefix='/prontuario', tags=['Prontuario'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.get('', response_model=Sequence[ProntuarioRead])
def get_prontuario(session: SessionDep, user: Annotated[User, Depends(get_current_user)]):
    return session.scalars(select(Prontuario).where(Prontuario.id == user.id)).all()


@router.post('', response_model=ProntuarioRead, status_code=201)
def create_prontuario(session: SessionDep, user: Annotated[User, Depends(get_current_user)]):
    if user.type != UserType.DOCTOR:
        raise HTTPException(status_code=401, detail='Esses dados só podem ser acessados por um médico')

    try:
        new_prontuario = Prontuario(
            peso=Prontuario.peso,
            altura=Prontuario.altura,
            alergias=Prontuario.alergias,
            sexo=Prontuario.sexo,
            tipo_sanguineo=Prontuario.tipo_sanguineo,
            patient_id=Prontuario.patient_id,
        )
        session.add(new_prontuario)
        session.commit()
        session.refresh(new_prontuario)
        return new_prontuario

    except Exception:
        session.rollback()
        raise HTTPException(status_code=500, detail='Ocorreu um erro interno')


@router.put('/{id}', response_model=ProntuarioRead)
def update_prontuario(
    session: SessionDep,
    id: int,
    new_prontuario: ProntuarioCreate,
    user: Annotated[User, Depends(get_current_user)],
):
    if user.type != UserType.DOCTOR:
        raise HTTPException(status_code=401, detail='Esses dados só podem ser acessados por um médico')

    stmt = (
        select(Prontuario)
        .join(Prontuario.consultas)
        .where(Prontuario.id == Consulta.prontuario_id, Consulta.medico_id == user.id)
    )

    prontuario = session.scalar(stmt)

    if prontuario is None:
        raise HTTPException(status_code=401, detail='Prontuário não encontrado')

    try:
        prontuario.peso = new_prontuario.peso
        prontuario.altura = new_prontuario.altura
        prontuario.alergias = new_prontuario.alergias or ''
        prontuario.sexo = new_prontuario.sexo or ''
        prontuario.tipo_sanguineo = new_prontuario.tipo_sanguineo or ''
        session.commit()
        session.refresh(prontuario)
        return prontuario
    
    except Exception:
        session.rollback()
        raise HTTPException(status_code=500, detail='Ocorreu um erro interno')
