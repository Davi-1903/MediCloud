from database import init_database, SessionLocal
from models.user import User
from models.administrator import Administrator

def seed_admin():
    init_database()

    session = SessionLocal()
    try:
        existente = session.query(User).filter(User.email == "admin@medicloud.com").first()
        if not existente:
            admin = Administrator(
                name="Administrador",
                email="admin@medicloud.com",
                password='$argon2id$v=19$m=65536,t=3,p=4$4E9g0h5OG2bJPfOJ5WTyDg$UKKW2wboElIl5C2OEJA+E5+mqa1fV9CjhGEgF1siM9k',
            )
            session.add(admin)
            session.commit()
    finally:
        session.close()