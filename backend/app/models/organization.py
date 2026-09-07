from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base

class Company(Base):
    __tablename__ = "company"
    id = Column(Integer, primary_key=True)
    company_code = Column(String(20))
    company_name = Column(String(255))
    country = Column(String(100))

class BusinessUnit(Base):
    __tablename__ = "business_unit"
    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("company.id"))
    bu_code = Column(String(20))
    bu_name = Column(String(255))

class Plant(Base):
    __tablename__ = "plant"
    id = Column(Integer, primary_key=True)
    business_unit_id = Column(Integer, ForeignKey("business_unit.id"))
    plant_code = Column(String(20))
    plant_name = Column(String(255))
