from dotenv import load_dotenv
from os import getenv
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException
from jwt import InvalidTokenError, ExpiredSignatureError, encode, decode


load_dotenv()


def get_env(key: str, default: str | None = None) -> str:
    value = getenv(key)
    if value is not None and value != '':
        return value
    if default is not None:
        return default
    raise ValueError(f'A variável de ambiente "{key}" não foi definida ou está vazia')


def create_access_token(data: dict) -> str:
    payload = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=float(get_env('TOKEN_EXPIRE_MINUTES', '60')))
    payload.update({'exp': expire, 'type': 'access'})
    return encode(payload, get_env('SECRET_KEY'), algorithm=get_env('ALGORITHM'))


def decode_access_token(token: str) -> str:
    try:
        payload = decode(token, get_env('SECRET_KEY'), algorithms=[get_env('ALGORITHM')])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token espirado')
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail='Token inválido')

    if payload.get('type') != 'access':
        raise HTTPException(status_code=401, detail='Token inválido')

    email = payload.get('sub')
    if email is None:
        raise HTTPException(status_code=401, detail='Token inválido')
    return email


def create_refresh_token(data: dict) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=float(get_env('REFRESH_TOKEN_EXPIRE_DAYS', '7')))
    payload = data.copy()
    if payload.get('sub') is not None:
        payload['sub'] = str(payload['sub'])
    payload.update({'exp': expire, 'type': 'refresh'})
    return encode(payload, get_env('SECRET_KEY'), algorithm=get_env('ALGORITHM'))


def decode_refresh_token(token: str) -> str:
    try:
        payload = decode(token, get_env('SECRET_KEY'), algorithms=[get_env('ALGORITHM')])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Refresh token expirado')
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail='Refresh token inválido')

    if payload.get('type') != 'refresh':
        raise HTTPException(status_code=401, detail='Token inválido')

    email = payload.get('sub')
    if email is None:
        raise HTTPException(status_code=401, detail='Refresh token inválido')
    return email
