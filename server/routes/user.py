from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlmodel import select
from database import get_session
from models.user import User
from typing import Annotated
from schemas.user import UserRead
from utils import decode_access_token


router = APIRouter(prefix='/user', tags=['user'])
SessionDep = Annotated[Session, Depends(get_session)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/auth/login')


def get_current_user(session: SessionDep, token: Annotated[str, Depends(oauth2_scheme)]) -> User:
    try:
        email = decode_access_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail='Token inválido')
    
    user = session.scalar(select(User).where(User.email == email))
    if not user:
        raise HTTPException(status_code=401, detail='Usuário não encontrado')
    return user


@router.get('/', response_model=UserRead)
def get_user(user: User = Depends(get_current_user)):
    return user
