from sqlalchemy import Column, Integer, String, Numeric
from app.core.database import Base

class Customer(Base):
    __tablename__ = "customer"
    id = Column(Integer, primary_key=True)
    customer_code = Column(String(50))
    customer_name = Column(String(255))
    segment = Column(String(100))
    region = Column(String(100))
    annual_revenue = Column(Numeric(18, 2))

class Vendor(Base):
    __tablename__ = "vendor"
    id = Column(Integer, primary_key=True)
    vendor_code = Column(String(50))
    vendor_name = Column(String(255))
    category = Column(String(100))
    spend = Column(Numeric(18, 2))

class Material(Base):
    __tablename__ = "material"
    id = Column(Integer, primary_key=True)
    material_code = Column(String(50))
    material_name = Column(String(255))
    material_group = Column(String(100))
    standard_cost = Column(Numeric(18, 2))
