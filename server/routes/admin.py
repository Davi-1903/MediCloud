from fastapi import APIRouter, Depends, HTTPException, Response
from pwdlib import PasswordHash
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, OperationalError
from database import get_session
from models.doctor import Doctor
from schemas.doctor import DoctorCreate
from typing import Annotated


router = APIRouter(prefix='/admin', tags=['admin'])
SessionDep = Annotated[Session, Depends(get_session)]
ph = PasswordHash.recommended()


@router.post('/doctor')
def create_doctor(session: SessionDep, user_input: DoctorCreate, response: Response):
    try:
        doctor = Doctor(
            name=user_input.name,
            email=user_input.email,
            password=ph.hash(user_input.password),
            specialty=user_input.specialty,
            crm=user_input.crm
        )
        session.add(doctor)
        session.commit()

        return {'ok': True, 'message': 'Médico adicionado com sucesso'}

    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail='Credenciais inválidas')


@router.put('/doctor/{doctor_id}')
def update_doctor(session: SessionDep, user_input: DoctorCreate, doctor_id: int):
    doctor = session.get(Doctor, doctor_id)
    if doctor is None:
        raise HTTPException(status_code=404, detail='Médico não encontrado')

    try:
        doctor.name = user_input.name
        doctor.email = user_input.email
        doctor.password = ph.hash(user_input.password)
        doctor.specialty = user_input.specialty
        doctor.crm = user_input.crm
        session.commit()

        return {'ok': True, 'message': 'Médico atualizado com sucesso'}

    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail='Credenciais inválidas')


@router.delete('/doctor/{doctor_id}')
def delete_doctor(session: SessionDep, doctor_id: int):
    doctor = session.get(Doctor, doctor_id)
    if doctor is None:
        raise HTTPException(status_code=404, detail='Médico não encontrado')

    try:
        session.delete(doctor)
        session.commit()
        return {'ok': True, 'message': 'Médico apagado com sucesso'}

    except OperationalError:
        session.rollback()
        raise HTTPException(status_code=500, detail='Ocorreu um erro apagar o médico')
