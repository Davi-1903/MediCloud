from fastapi import APIRouter, Depends, HTTPException
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
    token_refresh: str
    token_type: str


class RefreshToken(BaseModel):
    refresh_token: str


@router.post('/login', response_model=Token, status_code=200)
def login(session: SessionDep, user_input: UserLogin):
    user_db = session.scalar(select(User).where(User.email == user_input.email))
    if not user_db or not ph.verify(user_input.password, user_db.password):
        raise HTTPException(status_code=400, detail='Usuário ou senha incorretas')
    
    return {
        'token': create_access_token({'sub': user_input.email}),
        'token_refresh': create_refresh_token({'sub': user_input.email}),
        'token_type': 'bearer'
    }


@router.post('/register', response_model=Token, status_code=201)
def register(session: SessionDep, user_input: PatientCreate):
    try:
        user = Patient(
            name=user_input.name,
            email=user_input.email,
            password=ph.hash(user_input.password)
        )
        session.add(user)
        session.commit()

        return {
            'token': create_access_token({'sub': user_input.email}),
            'token_refresh': create_refresh_token({'sub': user_input.email}),
            'token_type': 'bearer'
        }
    
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail='Credenciais inválidas')


@router.post('/refresh')
def refresh(body: RefreshToken):
    email = decode_refresh_token(body.refresh_token)
    return {
        'token': create_access_token({'sub': email}),
        'token_type': 'bearer'
    }