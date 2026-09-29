from schemas.user import UserCreate, UserRead
from models.doctor import Status


class DoctorRead(UserRead):
    specialty: str
    crm: str
    status: Status


class DoctorCreate(UserCreate):
    specialty: str
    crm: str
