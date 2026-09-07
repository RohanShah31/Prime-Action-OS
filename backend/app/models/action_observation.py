from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base

class ActionObservation(Base):
    __tablename__ = "action_observation"

    id = Column(Integer, primary_key=True, index=True)
    action_id = Column(Integer, ForeignKey("action_master.id"))
    observation_type = Column(String(50))
    detail = Column(Text)
    severity = Column(String(20))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    action = relationship("ActionMaster", back_populates="observations")
