from sqlalchemy.orm import Session
from sqlalchemy import select
from models.user import User, UserType
from database import engine
from pwdlib import PasswordHash
from utils import get_env

ph = PasswordHash.recommended()
PASSWORD_ADMIN = get_env('PASSWORD_ADMIN')

def create_admin():
    with Session(engine) as session:
        existing = session.scalars(select(User).where(User.email == 'admin@medicloud.com')).first()

        if existing is None:
            admin = User(
                name='Administrador',
                email='admin@medicloud.com',
                password=ph.hash(PASSWORD_ADMIN),
                type=UserType.ADMIN
            )

            session.add(admin)
            session.commit()

            return admin