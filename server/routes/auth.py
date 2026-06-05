from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy import select
from database import get_session
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models.patient import Patient
from models.user import User
from typing import Annotated
from jwt import encode
from datetime import datetime, timedelta
from pwdlib import PasswordHash
from schemas.patient import PatientCreate
from utils import get_env


router = APIRouter(prefix='/auth', tags=['auth'])
SessionDep = Annotated[Session, Depends(get_session)]
ph = PasswordHash.recommended()


def create_access_token(data: dict) -> str:
    payload = data.copy()
    expire = datetime.now() + timedelta(minutes=int(get_env('TOKEN_EXPIRE_MINUTES', '30')))
    payload.update({'exp': expire})
    return encode(payload, get_env('SECRET_KEY'), algorithm=get_env('ALGORITHM'))


class UserLogin(BaseModel):
    email: EmailStr
    senha: str


class Token(BaseModel):
    token: str
    token_type: str


@router.post('/login', response_model=Token, status_code=200)
def login(session: SessionDep, user_input: UserLogin):
    user_db = session.scalar(select(User).where(User.email == user_input.email))
    if not user_db or not ph.verify(user_input.senha, user_db.password):
        raise HTTPException(status_code=400, detail='Usuário ou senha incorretas')
    
    return {
        'token': create_access_token({'sub': user_input.email}),
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
            'token_type': 'bearer'
        }
    
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail='Credenciais inválidas')
