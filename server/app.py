from database import init_database
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# gambiarra
from models.users import User
from contextlib import asynccontextmanager
from controllers import auth, user



@asynccontextmanager
async def lifespan(app: FastAPI):
    init_database()
    yield

app = FastAPI(lifespan=lifespan)

# não sei se é uma gambiarra
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.router)
app.include_router(user.router)