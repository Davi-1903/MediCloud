from database import init_database
from fastapi import FastAPI
# gambiarra
from models.users import User
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_database()
    yield

app = FastAPI(lifespan=lifespan)