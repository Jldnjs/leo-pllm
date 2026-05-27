from datetime import datetime, timedelta
from fastapi import HTTPException
import jwt
from dotenv import load_dotenv
import os
import bcrypt


load_dotenv()

SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM )
    return encoded_jwt

# 비번 검증
def verify_password(plain_password: str, hashed_password: str) -> bool:
    print(f"{plain_password}")
    print(f"{hashed_password}")
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except ValueError:
        # 이메일/비밀번호가 다르거나 DB에 해싱되지 않은 일반 텍스트(Plain Text) 비번이 들어있을 때 bcrypt가 ValueError를 발생시키는 것을 방지합니다.
        return False

# 비번 해싱
def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


# Token 검증
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")