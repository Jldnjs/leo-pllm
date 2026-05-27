from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user_model import User
from app.core.security import verify_password, create_access_token

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