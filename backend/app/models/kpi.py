from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey
from app.core.database import Base

class KPIMaster(Base):
    __tablename__ = "kpi_master"
    id = Column(Integer, primary_key=True)
    kpi_code = Column(String(50))
    kpi_name = Column(String(255))
    category = Column(String(100))

class KPIMeasurement(Base):
    __tablename__ = "kpi_measurement"
    id = Column(Integer, primary_key=True)
    kpi_id = Column(Integer, ForeignKey("kpi_master.id"))
    measurement_date = Column(Date)
    actual_value = Column(Numeric(18, 2))
    target_value = Column(Numeric(18, 2))
