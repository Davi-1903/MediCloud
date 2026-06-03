from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from jwt import decode
from sqlmodel import Session
from database import get_session
from models.users import User
from typing import Annotated
from jwt import decode, ExpiredSignatureError, InvalidTokenError

token_schema = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(prefix="/user", tags=['user'])

SessionDep = Annotated[Session, Depends(get_session)]

SECRET_KEY = 'CHAVE-SECRETA'
ALGORITHM = 'HS256'
TOKEN_EXPIRE_MINUTES = 30

def decode_access_token(token: str) -> int:
    try:
        payload = decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token espirado')
    
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail='Token innválido')

    if payload.get('type') != 'access':
        raise HTTPException(status_code=401, detail="Token inválido")
    
    user_id = payload.get('sub')
    if user_id is None:
        raise HTTPException(status_code=401, detail='Campo "sub" não encontrado')
    
    return user_id


def get_current_user(session: SessionDep, token: Annotated[str, Depends(token_schema)]):
    try:
        user_id = decode_access_token(token)
    except:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    return user

@router.get("/")
def get_user(user: User = Depends(get_current_user)):
    return JSONResponse(
        status_code=200,
        content= {
            'id': user.id,
            'email': user.email,
            'name': user.nome
        }
    )