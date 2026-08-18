from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database import get_session
from pydantic import BaseModel
from models.doctor import Doctor
from schemas.doctor import DoctorCreate
from typing import Annotated


router = APIRouter(prefix='/admin', tags=['admin'])
SessionDep = Annotated[Session, Depends(get_session)]
ph = PasswordHash.recommended()


@router.post('/create_doctor')
def create_doctor(session: SessionDep, user_input: DoctorCreate, response: Response):
    try:
        doctor = Doctor(
            name=user_input.name,
            email=user_input.email,
            password=ph.hash(user_input.password),
            specialty=user_input.specialty,
            crm=user_input.crm
        )
        session.add(doctor)
        session.commit()

        return {
            'ok': True, 'message': 'Médico adicionado com sucesso'
        }

    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail='Credenciais inválidas')