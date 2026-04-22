from fastapi import FastAPI
# gambiarra
from database import init_database
import models.users

app = FastAPI()

# gambiarra
init_database()