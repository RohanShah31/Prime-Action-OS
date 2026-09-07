from sqlalchemy import Column, Integer, String, Text, Numeric, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class DecisionRecord(Base):
    __tablename__ = "decision_record"
    id = Column(Integer, primary_key=True)
    action_id = Column(Integer, ForeignKey("action_master.id"))
    decision_score = Column(Numeric(5, 2))
    recommendation = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
