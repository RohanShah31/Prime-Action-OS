from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, JSON
from sqlalchemy.sql import func
from app.core.database import Base

class ActionAssignment(Base):
    __tablename__ = "action_assignment"
    id = Column(Integer, primary_key=True)
    action_id = Column(Integer, ForeignKey("action_master.id"))
    assigned_to = Column(String(100))
    assigned_by = Column(String(100))
    status = Column(String(50))
    created_at = Column(DateTime, server_default=func.now())

class ActionComment(Base):
    __tablename__ = "action_comment"
    id = Column(Integer, primary_key=True)
    action_id = Column(Integer, ForeignKey("action_master.id"))
    author = Column(String(100))
    comment = Column(Text)
    created_at = Column(DateTime, server_default=func.now())

class ActionAudit(Base):
    __tablename__ = "action_audit"
    id = Column(Integer, primary_key=True)
    action_id = Column(Integer)
    event_type = Column(String(100))
    old_status = Column(String(50))
    new_status = Column(String(50))
    changed_by = Column(String(100))
    notes = Column(Text)
    created_at = Column(DateTime, server_default=func.now())

class ActionEvent(Base):
    __tablename__ = "action_event"
    id = Column(Integer, primary_key=True)
    action_id = Column(Integer)
    event_name = Column(String(100))
    payload = Column(JSON)
    created_at = Column(DateTime, server_default=func.now())
