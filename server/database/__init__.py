from sqlmodel import SQLModel, create_engine, Session

DATABASE_URI = 'sqlite:///database/medicloud.db'
args = {'check_same_thread': False}
engine = create_engine(DATABASE_URI, connect_args=args)

def init_database():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session