from collections.abc import Generator
from typing import Any
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
from utils import get_env


DATABASE_URI = get_env('DATABASE_URI')

if DATABASE_URI.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URI,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(DATABASE_URI)

SessionLocal = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    pass


def init_database():
    Base.metadata.create_all(engine)


def get_session() -> Generator[Session, Any, None]:
    with SessionLocal(bind=engine) as session:
        yield session
