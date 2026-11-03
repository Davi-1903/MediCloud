from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_session
from schemas.consulta import ConsultaRead
from models.consulta import Consulta
from routes.user import get_current_user

router = APIRouter(prefix='/consulta', tags=['Consultas'])
SessionDep = Annotated[Session, Depends(get_session)] 

@router.get('/{patient_id}', response_model=ConsultaRead)
def get_consultas(session: SessionDep, patient_id: int, user: Annotated[User, Depends(get_current_user)]):
    consultas = session.scalars(select(Consulta).where(Consulta.patient_id == patient_id)).all()

    if consultas is None:
        raise HTTPException(status_code=404, detail='Consultas não encontradas')

    return consultas