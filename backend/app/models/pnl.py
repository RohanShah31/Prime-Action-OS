from sqlalchemy import Column, Integer, Numeric, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class PnLSnapshot(Base):
    __tablename__ = "pnl_snapshot"
    
    id = Column(Integer, primary_key=True)
    fiscal_year = Column(Integer)
    revenue = Column(Numeric(18, 2))
    cogs = Column(Numeric(18, 2))
    gross_profit = Column(Numeric(18, 2))
    operating_expense = Column(Numeric(18, 2))
    ebitda = Column(Numeric(18, 2))
    net_profit = Column(Numeric(18, 2))
    created_at = Column(DateTime, server_default=func.now())