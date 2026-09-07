from sqlalchemy import Column, Integer, String
from app.core.database import Base

class SAPObject(Base):
    __tablename__ = "sap_object"
    id = Column(Integer, primary_key=True)
    object_type = Column(String(100))
    object_name = Column(String(255))
    module = Column(String(100))
