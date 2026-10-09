from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import init_database
from database.seed_admin import seed_admin
from routes import admin, agenda, auth, doctor, prontuario, user


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_database()
    seed_admin()
    yield


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials=True,
)

app.include_router(auth.router, prefix='/api')
app.include_router(user.router, prefix='/api')
app.include_router(admin.router, prefix='/api')
app.include_router(doctor.router, prefix='/api')
app.include_router(agenda.router, prefix='/api')
app.include_router(prontuario.router, prefix='/api')
