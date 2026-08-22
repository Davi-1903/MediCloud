from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, EmailStr
from sqlalchemy import select
from database import get_session
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models.patient import Patient
from models.user import User
from typing import Annotated
from pwdlib import PasswordHash
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


def set_refresh_cookie(response: Response, token: str):
    response.set_cookie(
        key='refresh_token',
        value=token,
        httponly=True,
        secure=True,
        samesite='strict',
        max_age=60 * 60 * 24 * 30,
        path='/api/auth',
    )


@router.post('/login', response_model=Token, status_code=200)
def login(session: SessionDep, user_input: UserLogin, response: Response):
    user_db = session.scalar(select(User).where(User.email == user_input.email))
    if not user_db or not ph.verify(user_input.password, user_db.password):
        raise HTTPException(status_code=400, detail='Usuário ou senha incorretas')

    refresh_token = create_refresh_token({'sub': user_db.id})
    set_refresh_cookie(response, refresh_token)

    return {'token': create_access_token({'sub': user_input.email}), 'token_type': 'bearer'}


@router.post('/register', response_model=Token, status_code=201)
def register(session: SessionDep, user_input: PatientCreate, response: Response):
    try:
        user = Patient(name=user_input.name, email=user_input.email, password=ph.hash(user_input.password))
        session.add(user)
        session.commit()

        refresh_token = create_refresh_token({'sub': user.id})
        set_refresh_cookie(response, refresh_token)

        return {'token': create_access_token({'sub': user_input.email}), 'token_type': 'bearer'}

    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail='Credenciais inválidas')


@router.post('/refresh')
def refresh(request: Request, response: Response):
    token = request.cookies.get('refresh_token')
    if token is None:
        raise HTTPException(status_code=401, detail='Refresh token ausente')

    user_id = decode_refresh_token(token)
    new_refresh = create_refresh_token({'sub': int(user_id)})
    set_refresh_cookie(response, new_refresh)

    return {'token': create_access_token({'sub': int(user_id)}), 'token_type': 'bearer'}


@router.post('/logout')
def logout(response: Response):
    response.delete_cookie('refresh_token', path='/api/auth', secure=True, samesite='strict', httponly=True)
    return {'detail': 'Logout realizado'}
