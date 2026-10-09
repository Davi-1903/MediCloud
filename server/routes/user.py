from typing import Annotated
import re

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select, func
from sqlalchemy.dialects.mysql import match
from sqlalchemy.orm import Session, with_polymorphic

from database import get_session
from models.user import User
from schemas.user import UserRead
from utils import decode_access_token


router = APIRouter(prefix='/user', tags=['user'])
SessionDep = Annotated[Session, Depends(get_session)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/auth/login')

def to_boolean_prefix_search(term: str) -> str:
    sanitized = re.sub(r'[+\-<>()~*"@]', ' ', term)
    words = sanitized.split()
    return ' '.join(f'+{w}*' for w in words)

def get_current_user(session: SessionDep, token: Annotated[str, Depends(oauth2_scheme)]) -> User:
    try:
        email = decode_access_token(token)
    except HTTPException:
        raise HTTPException(status_code=401, detail='Token inválido')

    user = session.scalar(select(User).where(User.email == email))
    if not user:
        raise HTTPException(status_code=401, detail='Usuário não encontrado')
    return user


@router.get('/', response_model=UserRead)
def get_user(user: Annotated[User, Depends(get_current_user)]):
    return user

@router.get('/filter', response_model=UserRead)
def get_user_filter(user: str, session: SessionDep):
    search = user
    UserPoly = with_polymorphic(User, '*')

    count_stmt = (
        select(func.count())
        .select_from(UserPoly)
    )
    statement = (
        select(UserPoly)
        .offset(0)
        .limit(50)
        .order_by(UserPoly.created_at.desc())
    )
    
    if search != '':
        search_term = to_boolean_prefix_search(search)
        if search_term:
            score = match(UserPoly.name, UserPoly.email, against=search_term, in_boolean_mode=True)
            statement = statement.where(score).order_by(score.desc())
            count_stmt = count_stmt.where(score)

        users = session.scalars(statement).all()

        return users