from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.auth_schema import SignUpRequest
from app.services.auth_service import AuthService

router = APIRouter(prefix="/admin", tags=["Admin"])
auth_service = AuthService()

@router.post("/saveMember",status_code = status.HTTP_201_CREATED)
def signup(payload:SignUpRequest, db:Session = Depends(get_db)):
    return auth_service.saveMember(db, payload)

@router.post("/memberList")
def getMemberList(db:Session = Depends(get_db)):
    return auth_service.getMemberList(db)