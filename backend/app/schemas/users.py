from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None


class UserCreate(UserBase):
    password: str | None = None


class UserRead(UserBase):
    id: str

    class Config:
        orm_mode = True
