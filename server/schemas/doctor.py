from models.doctor import Status
from schemas.user import UserCreate, UserRead


class DoctorRead(UserRead):
    specialty: str
    crm: str
    uf: str
    status: Status


class DoctorCreate(UserCreate):
    specialty: str
    crm: str
    uf: str