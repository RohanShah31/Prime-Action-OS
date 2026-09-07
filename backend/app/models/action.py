from sqlalchemy import Column, Integer, String, Text, Numeric, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class ActionMaster(Base):
    __tablename__ = "action_master"

    id = Column(Integer, primary_key=True)
    action_code = Column(String(100), unique=True)
    action_name = Column(String(255))
    category = Column(String(100))
    description = Column(Text)
    expected_benefit = Column(Numeric(18, 2))
    implementation_cost = Column(Numeric(18, 2))
    confidence_score = Column(Numeric(5, 2))
    priority_score = Column(Integer)
    status = Column(String(50))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    observations = relationship("ActionObservation", back_populates="action")