from pydantic import ConfigDict

from schemas.user import UserCreate, UserRead


class PatientRead(UserRead):
    model_config = ConfigDict(from_attributes=True)



class PatientCreate(UserCreate):
    pass
