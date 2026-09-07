from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class SAPMetadata(Base):
    __tablename__ = "sap_metadata"
    id = Column(Integer, primary_key=True)
    object_type = Column(String(100))
    object_name = Column(String(255))
    module = Column(String(100))
    description = Column(Text)

class SAPRule(Base):
    __tablename__ = "sap_rule"
    id = Column(Integer, primary_key=True)
    rule_name = Column(String(255))
    rule_type = Column(String(100))
    source_object = Column(String(255))
    condition_text = Column(Text)
    action_text = Column(Text)

class SAPProcessEvent(Base):
    __tablename__ = "sap_process_event"
    id = Column(Integer, primary_key=True)
    process_name = Column(String(100))
    event_name = Column(String(255))
    event_time = Column(DateTime)
