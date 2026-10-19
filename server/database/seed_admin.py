from database import SessionLocal
from models.user import User
from models.administrator import Administrator
from utils import get_env
from pwdlib import PasswordHash

ph = PasswordHash.recommended()

PASSWORD_ADMIN = get_env('PASSWORD_ADMIN')

def seed_admin():
    password = ph.hash(PASSWORD_ADMIN)
    session = SessionLocal()
    try:
        existente = session.query(User).filter(User.email == "admin@medicloud.com").first()
        if not existente:
            admin = Administrator(
                name="Administrador",
                email="admin@medicloud.com",
                password=password,
            )
            session.add(admin)
            session.commit()
    finally:
        session.close()