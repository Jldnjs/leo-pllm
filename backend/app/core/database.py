from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:wldnjs@localhost:5432/leopard_db"

engine = create_engine(DATABASE_URL)

# DB세션 팩토리
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 모델과 테이블을 매핑하기 위한 기본 클래스
Base = declarative_base()

# DB세션 생성 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
