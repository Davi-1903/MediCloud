from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlalchemy.orm import Session

from database import get_session
from models.doctor import Doctor, Status
from models.user import User, UserType
from routes.user import get_current_user
from schemas.doctor import DoctorCreate


router = APIRouter(prefix='/admin', tags=['admin'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.patch('/doctors/{doctor_id}/active', response_model=DoctorCreate)
def approve_doctor(session: SessionDep, doctor_id: int, user: Annotated[User, Depends(get_current_user)]):
    if not user or user.type != UserType.ADMIN:
        raise HTTPException(status_code=403, detail='Acesso negado')

    try:
        doctor = session.get(Doctor, doctor_id)
        if not doctor:
            raise HTTPException(status_code=404, detail='Médico não encontrado')

        doctor.status = Status.ACTIVE
        session.commit()
        return doctor

    except OperationalError:
        raise HTTPException(status_code=500, detail='Erro na conexão com o banco de dados')

    except IntegrityError:
        raise HTTPException(status_code=400, detail='Erro de integridade ocorreu')


@router.patch('/doctors/{doctor_id}/inactive', response_model=DoctorCreate)
def deny_doctor(session: SessionDep, doctor_id: int, user: Annotated[User, Depends(get_current_user)]):
    if not user or user.type != UserType.ADMIN:
        raise HTTPException(status_code=403, detail='Acesso negado')

    try:
        doctor = session.get(Doctor, doctor_id)
        if not doctor:
            raise HTTPException(status_code=404, detail='Médico não encontrado')

        doctor.status = Status.INACTIVE
        session.commit()
        return doctor

    except OperationalError:
        raise HTTPException(status_code=500, detail='Erro na conexão com o banco de dados')

    except IntegrityError:
        raise HTTPException(status_code=400, detail='Erro de integridade ocorreu')
