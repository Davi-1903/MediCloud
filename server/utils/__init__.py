from dotenv import load_dotenv
from os import getenv
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException
from jwt import InvalidTokenError, ExpiredSignatureError, encode, decode


load_dotenv()


def get_env(key: str, default: str | None = None) -> str:
    '''
    Carregar variáveis de ambiente, com opção de valor padrão. Se a variável não for encontrada e nenhum valor padrão for fornecido, uma exceção será lançada.

    Params:
        key (str): O nome da variável de ambiente a ser carregada.
        default (str | None): Um valor padrão a ser retornado se a variável de ambiente não for encontrada.
    
    Returns:
        str: O valor da variável de ambiente ou o valor padrão, se fornecido.
    
    Raises:
        ValueError: Se a variável de ambiente não for encontrada e nenhum valor padrão for fornecido.

    Exemplo de uso:

    >>> get_env('DATABASE_URL', 'sqlite:///app.db')
    'sqlite:///app.db'
    >>> get_env('SECRET_KEY')
    Traceback (most recent call last):
        ...
    ValueError: A variável de ambiente "SECRET_KEY" não foi definida ou está vazia
    '''
    
    value = getenv(key)
    if value is not None and value != '':
        return value
    if default is not None:
        return default
    raise ValueError(f'A variável de ambiente "{key}" não foi definida ou está vazia')


def create_access_token(data: dict) -> str:
    payload = data.copy()
    expire = datetime.now() + timedelta(minutes=int(get_env('TOKEN_EXPIRE_MINUTES', '30')))
    payload.update({'exp': expire})
    return encode(payload, get_env('SECRET_KEY'), algorithm=get_env('ALGORITHM'))


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


def create_refresh_token(data: dict) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=int(get_env('REFRESH_TOKEN_EXPIRE_DAYS', '7')))
    payload = data.copy()
    if payload.get('sub') is not None:
        payload['sub'] = str(payload['sub'])
    payload.update({'exp': expire, 'type': 'refresh'})
    return encode(payload, get_env('SECRET_KEY'), algorithm=get_env('ALGORITHM'))


def decode_refresh_token(token: str) -> int:
    try:
        payload = decode(token, get_env('SECRET_KEY'), algorithms=[get_env('ALGORITHM')])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Refresh token expirado')
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail='Refresh token inválido')
    
    if payload.get('type') != 'refresh':
        raise HTTPException(status_code=401, detail='Token inválido')

    user_id = payload.get('sub')
    if user_id is None:
        raise HTTPException(status_code=401, detail='Refresh token inválido')
    return int(user_id)