from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email:EmailStr
    password:str

class SignUpRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "USER"
    mobile: str