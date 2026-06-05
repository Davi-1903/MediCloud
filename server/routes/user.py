from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jwt import decode
from database import get_session
from models.user import User
from typing import Annotated
from jwt import decode, ExpiredSignatureError, InvalidTokenError
from schemas.user import UserRead
from utils import get_env


router = APIRouter(prefix="/user", tags=['user'])
SessionDep = Annotated[Session, Depends(get_session)]
token_schema = OAuth2PasswordBearer(tokenUrl="/auth/login")


def decode_access_token(token: str) -> int:
    try:
        payload = decode(token, get_env('SECRET_KEY'), algorithms=[get_env('ALGORITHM')])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token espirado')
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail='Token inválido')

    if payload.get('type') != 'access':
        raise HTTPException(status_code=401, detail="Token inválido")
    
    user_id = payload.get('sub')
    if user_id is None:
        raise HTTPException(status_code=401, detail='Token inválido')
    return int(user_id)


def get_current_user(session: SessionDep, token: Annotated[str, Depends(token_schema)]) -> User:
    try:
        user_id = decode_access_token(token)
    except:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    return user


@router.get("/", response_model=UserRead)
def get_user(user: User = Depends(get_current_user)):
    return user
