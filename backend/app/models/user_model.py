from sqlalchemy import Column, Integer, String, Boolean, Date
from app.core.database import Base
from sqlalchemy.sql import func

# DB의 users테이블과 1:1  매핑
class User(Base):
    __tablename__ = "users"

    member_no = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default = "USER", nullable=False)

    name = Column(String, nullable=False)
    mobile = Column(String, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    start_date = Column(Date, nullable = False, server_default=func.current_date())
    end_date = Column(Date, nullable = True)