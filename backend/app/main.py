from fastapi import FastAPI, HTTPException, Depends, status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from app.services.auth_service import AuthService
from app.schemas.auth_schema import LoginRequest
from app.core.database import get_db
from app.routers.admin_router import router

app = FastAPI()
auth_service = AuthService()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Leo LLM is running!"}

@app.post("/login")
async def login(data: LoginRequest, db: Session = Depends(get_db)):

    result = auth_service.login(data.email, data.password,db)
    if result["success"]:
        print("로그인 성공")
        return result
    print("로그인실패")
    raise HTTPException(status_code=401, detail=result["message"])

app.include_router(router)