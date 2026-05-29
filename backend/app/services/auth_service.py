from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user_model import User
from app.schemas.auth_schema import SignUpRequest
from app.core.security import verify_password, create_access_token, get_password_hash
from datetime import date

class AuthService:
    
    def login(self, email:str , password:str, db:Session):
        
        user = db.query(User).filter(User.email == email).first()
        isSuccess = True
        print(f"user : {user}")
        if not user:
            isSuccess = False
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        
        if not verify_password(password, user.password):
            isSuccess = False
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password")
        
        token_data = {
            "sub":user.email,
            "role":user.role
        }
        access_token = create_access_token(data=token_data)

        return {"success": isSuccess,
                "access_token":access_token,
                "token_type" : "bearer",
                "user":{
                    "email" : user.email,
                    "role" : user.role
                }}
    
    def saveMember(self, db:Session,payload:SignUpRequest) -> dict:
        existing_user = db.query(User).filter(User.email == payload.email).first()
        print(f"existing_user : {existing_user}")
        print(f"payload : {payload}")

        if existing_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
        try:
            hashed_password = get_password_hash(payload.password)

            # 스키마 데이터를 바탕으로 DB에 저장될 모델 인스턴스 조립
            new_user =  User(
                email = payload.email,
                password = hashed_password,
                name = payload.name,
                mobile = payload.mobile,
                role = payload.role,
                start_date = date.today()
            )

            # DB 영속화
            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            return {"success": True,
                    "message": "신규 멤버가 성공적으로 등록되었습니다.",
                    "user":{
                        "email" : new_user.email,
                        "role" : new_user.role
                    }}
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


    def getMemberList(self, db:Session):
        results = db.query(User.name, User.email, User.role, User.mobile, User.is_active, User.start_date, User.end_date).all() 
        print(f"results : {results}")
        if not results:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Member not found")
        
        return results