from pydantic import BaseModel, ConfigDict, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserRead(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class UserCreate(UserBase):
    password: str
