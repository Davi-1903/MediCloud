from schemas.user import UserCreate, UserRead


class DoctorRead(UserRead):
    specialty: str
    crm: str


class DoctorCreate(UserCreate):
    specialty: str
    crm: str
