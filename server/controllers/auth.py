from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, SQLModel
from database import get_session
from models.users import User, Paciente
from typing import Annotated
from jwt import encode
from datetime import datetime, timedelta
from pwdlib import PasswordHash


router = APIRouter(prefix='/auth', tags=['auth'])

SessionDep = Annotated[Session, Depends(get_session)]

SECRET_KEY = 'CHAVE-SECRETA'
ALGORITHM = 'HS256'
TOKEN_EXPIRE_MINUTES = 30


# token para autenticação
def create_access_token(data: dict):
    data = data
    expire = datetime.now() + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    data.update({'exp': expire})
    token = encode(data, SECRET_KEY, algorithm=ALGORITHM)

    return token


# gerar hash
passwordHash = PasswordHash.recommended()

def get_password_hash(senha: str):
    return passwordHash.hash(senha)


def verify_password(senha: str, senha_hash: str):
    return passwordHash.verify(senha, senha_hash)


class UserCreate(SQLModel):
    nome: str
    email: str
    senha: str


class UserLogin(SQLModel):
    email: str
    senha: str


class Token(SQLModel):
    token: str
    token_type: str


@router.post('/login', response_model=Token, status_code=200)
def login(session: SessionDep, user: UserLogin):
    user_db = session.exec(select(User).where(User.email == user.email)).first()
    if not user_db or not verify_password(user.senha, user_db.senha):
        raise HTTPException(
            status_code=400,
            detail='Usuário ou senha incorretas'
        )
    
    return {
        'token': create_access_token({'sub': user.email}),
        'token_type': 'bearer'
    }


@router.post('/register', response_model=Token, status_code=201)
def register(session: SessionDep, user: UserCreate):
    existing_user = session.exec(
        select(User).where(User.email == user.email)
    ).first()

    if not existing_user:
        senha_hash = get_password_hash(user.senha)
        new_user = User(
            nome= user.nome,
            email= user.email,
            senha= senha_hash,
            tipo='paciente'
        )
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        
        new_paciente = Paciente(user_id=new_user.id) # type: ignore
        
        session.add(new_paciente)
        session.commit()
        session.refresh(new_paciente)

        access_token = create_access_token(data={'sub': user.email})
        return {'token': access_token, 'token_type': 'bearer'}
    
    raise HTTPException(
        status_code=400,
        detail='Email já existe'
    )
