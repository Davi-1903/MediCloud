from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import get_session
from models.doctor import Doctor, Status
from routes.auth import Token, ph, set_refresh_cookie
from schemas.doctor import DoctorCreate, DoctorRead
from utils import create_access_token, create_refresh_token, decode_access_token


router = APIRouter(prefix='/doctors', tags=['doctors'])
SessionDep = Annotated[Session, Depends(get_session)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/auth/login')


def get_current_doctor(session: SessionDep, token: Annotated[str, Depends(oauth2_scheme)]) -> Doctor:
    try:
        sub = decode_access_token(token)
    except HTTPException:
        raise HTTPException(status_code=401, detail='Token inválido')

    doctor = session.get(Doctor, int(sub))
    if doctor is None:
        raise HTTPException(status_code=401, detail='Médico não encontrado')
    if doctor.status != Status.ACTIVE:
        raise HTTPException(status_code=403, detail='Médico não aprovado pelo administrador')
    return doctor


@router.get('/user', response_model=DoctorRead)
def get_user_doctor(doctor: Annotated[Doctor, Depends(get_current_doctor)]):
    return doctor


@router.post('/register', response_model=Token, status_code=201)
def register_doctor(session: SessionDep, doctor_input: DoctorCreate, response: Response):
    try:
        doctor = Doctor(
            name=doctor_input.name,
            email=doctor_input.email,
            password=ph.hash(doctor_input.password),
            specialty=doctor_input.specialty,
            crm=doctor_input.crm,
            uf=doctor_input.uf,
        )
        session.add(doctor)
        session.commit()

        refresh_token = create_refresh_token({'sub': doctor.id})
        set_refresh_cookie(response, refresh_token)

        return {
            'token': create_access_token({'sub': doctor_input.email}),
            'token_type': 'bearer',
            'role': 'doctor',
        }

    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail='Credenciais inválidas')
