from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey
from app.core.database import Base

class SAPObservation(Base):
    __tablename__ = "sap_observation"
    
    id = Column(Integer, primary_key=True)
    action_id = Column(Integer, ForeignKey("action_master.id"))
    sap_table = Column(String(100))
    observation = Column(Text)
    financial_impact = Column(Numeric(18, 2))
    confidence_score = Column(Numeric(5, 2))