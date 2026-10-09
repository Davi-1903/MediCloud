from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from database import get_session
from models.user import User, UserType
from utils import decode_access_token


bearer = HTTPBearer(auto_error=False)
SessionDep = Annotated[Session, Depends(get_session)]


def get_current_user(
    session: SessionDep,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer)],
) -> User:
    if credentials is None:
        raise HTTPException(status_code=401, detail='Não autenticado')

    sub = decode_access_token(credentials.credentials)

    try:
        user = session.get(User, int(sub))
    except ValueError:
        user = None

    if not user:
        raise HTTPException(status_code=401, detail='Token inválido')
    return user


def require_roles(*roles: UserType):
    def checker(current_user: Annotated[User, Depends(get_current_user)]) -> User:
        if current_user.type not in roles:
            raise HTTPException(status_code=403, detail='Sem permissão')
        return current_user

    return checker