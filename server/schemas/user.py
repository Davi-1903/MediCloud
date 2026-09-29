from datetime import date

from pydantic import BaseModel, ConfigDict, EmailStr

from models.user import UserType


class UserBase(BaseModel):
    name: str
    email: EmailStr
    tel: str | None = None
    cpf: str | None = None
    birth_date: date | None = None
    street: str | None = None
    city: str | None = None
    state: str | None = None
    number: int | None = None
    cep: str | None = None


class UserRead(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    type: UserType


class UserCreate(UserBase):
    password: str
