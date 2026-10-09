from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from database import get_session
from models.user import User
from schemas.user import UserRead
from utils import decode_access_token


router = APIRouter(prefix='/user', tags=['user'])
SessionDep = Annotated[Session, Depends(get_session)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/auth/login')


def get_current_user(session: SessionDep, token: Annotated[str, Depends(oauth2_scheme)]) -> User:
    try:
        sub = decode_access_token(token)
    except HTTPException:
        raise HTTPException(status_code=401, detail='Token inválido')

    try:
        user = session.get(User, int(sub))
    except ValueError:  # token antigo, com email no sub
        user = None

    if not user:
        raise HTTPException(status_code=401, detail='Usuário não encontrado')
    return user


@router.get('/', response_model=UserRead)
def get_user(user: Annotated[User, Depends(get_current_user)]):
    return user