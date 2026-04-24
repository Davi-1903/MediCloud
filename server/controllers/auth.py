from fastapi import APIRouter, Depends
from sqlmodel import Session, select, SQLModel
from database import get_session
from models.users import User, Paciente
from typing import Annotated

router = APIRouter(prefix='/auth', tags=['auth'])

SessionDep = Annotated[Session, Depends(get_session)]

class UserCreate(SQLModel):
    nome: str
    email: str
    senha: str

@router.post('/register')
def register(session: SessionDep, user: UserCreate):
    request = session.exec(
        select(User).where(User.email == user.email)
    ).first()

    if not request:
        new_user = User(
            nome= user.nome,
            email= user.email,
            senha= user.senha,
            tipo='paciente'
        )
        session.add(new_user)
        session.commit()
        
        paciente = Paciente(user_id=new_user.id)
        
        session.add(paciente)
        session.commit()

        return 'ok'

    return 'error'
