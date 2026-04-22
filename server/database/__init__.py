from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DATABASE_URI = 'sqlite:///database/medicloud.db'

engine = create_engine(DATABASE_URI)
session = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass

def init_database():
    Base.metadata.create_all(engine)