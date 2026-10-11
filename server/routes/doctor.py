from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import get_session
from models.doctor import Doctor
from models.user import User
from routes.auth import Token, ph, set_refresh_cookie
from routes.user import get_current_user
from schemas.doctor import DoctorCreate, DoctorRead
from utils import create_access_token, create_refresh_token


router = APIRouter(prefix='/doctors', tags=['doctors'])
SessionDep = Annotated[Session, Depends(get_session)]


@router.get('/user', response_model=DoctorRead)
def get_user_doctor(user: Annotated[User, Depends(get_current_user)]):
    return user


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

        return {'token': create_access_token({'sub': doctor_input.email}), 'token_type': 'bearer', 'role': 'doctor'}

    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail='Credenciais inválidas')
