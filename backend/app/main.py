from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.services.auth_service import AuthService
from app.schemas.auth_schema import LoginRequest

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
async def login(data: LoginRequest):

    result = auth_service.login(data.email, data.password)
    if result["success"]:
        print("로그인 성공")
        return result
    print("로그인실패")
    raise HTTPException(status_code=401, detail=result["message"])
