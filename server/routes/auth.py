from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pwdlib import PasswordHash
from pydantic import BaseModel, EmailStr
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import get_session
from models.patient import Patient
from models.user import User
from models.prontuario import Prontuario
from schemas.patient import PatientCreate
from utils import create_access_token, create_refresh_token, decode_refresh_token


router = APIRouter(prefix='/auth', tags=['auth'])
SessionDep = Annotated[Session, Depends(get_session)]
ph = PasswordHash.recommended()


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    token: str
    token_type: str
    role: str


def build_token_response(user: User) -> dict:
    role = user.type.value
    return {
        'token': create_access_token({'sub': str(user.id), 'role': role}),
        'token_type': 'bearer',
        'role': role,
    }


def set_refresh_cookie(response: Response, token: str):
    response.set_cookie(
        key='refresh_token',
        value=token,
        httponly=True,
        secure=False,
        samesite='strict',
        max_age=60 * 60 * 24 * 30,
        path='/api/auth',
    )


@router.post('/login', response_model=Token, status_code=200)
def login(session: SessionDep, user_input: UserLogin, response: Response):
    user_db = session.scalar(select(User).where(User.email == user_input.email))
    if not user_db or not ph.verify(user_input.password, user_db.password):
        raise HTTPException(status_code=400, detail='Usuário ou senha incorretas')

    set_refresh_cookie(response, create_refresh_token({'sub': str(user_db.id)}))
    return build_token_response(user_db)


@router.post('/register', response_model=Token, status_code=201)
def register(session: SessionDep, user_input: PatientCreate, response: Response):
    try:
        user = Patient(
            name=user_input.name,
            email=user_input.email,
            password=ph.hash(user_input.password),
        )
        session.add(user)
        session.flush()  

        new_prontuario = Prontuario(patient_id=user.id)
        session.add(new_prontuario)

        session.commit()  
        session.refresh(user)
        session.refresh(new_prontuario)

        set_refresh_cookie(response, create_refresh_token({'sub': str(user.id)}))
        return build_token_response(user)

    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail='Credenciais inválidas')


@router.post('/refresh', response_model=Token)
def refresh(request: Request, response: Response, session: SessionDep):
    token = request.cookies.get('refresh_token')
    if token is None:
        raise HTTPException(status_code=401, detail='Refresh token ausente')

    user_id = decode_refresh_token(token)
    user = session.get(User, int(user_id))
    if not user:
        raise HTTPException(status_code=401, detail='Usuário não encontrado')

    set_refresh_cookie(response, create_refresh_token({'sub': str(user.id)}))
    return build_token_response(user)


@router.post('/logout')
def logout(response: Response):
    response.delete_cookie('refresh_token', path='/api/auth', secure=False, samesite='strict', httponly=True)
    return {'detail': 'Logout realizado'}