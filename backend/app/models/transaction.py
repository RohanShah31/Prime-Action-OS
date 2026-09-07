from sqlalchemy import Column, Integer, String, Numeric, ForeignKey
from app.core.database import Base

class SalesOrder(Base):
    __tablename__ = "sales_order"
    id = Column(Integer, primary_key=True)
    sales_order_number = Column(String(50))
    customer_id = Column(Integer, ForeignKey("customer.id"))
    order_value = Column(Numeric(18, 2))
    discount_percent = Column(Numeric(5, 2))
    margin_percent = Column(Numeric(5, 2))

class PurchaseOrder(Base):
    __tablename__ = "purchase_order"
    id = Column(Integer, primary_key=True)
    po_number = Column(String(50))
    vendor_id = Column(Integer, ForeignKey("vendor.id"))
    order_value = Column(Numeric(18, 2))
    savings = Column(Numeric(18, 2))

class InventoryStock(Base):
    __tablename__ = "inventory_stock"
    id = Column(Integer, primary_key=True)
    material_id = Column(Integer, ForeignKey("material.id"))
    plant_id = Column(Integer, ForeignKey("plant.id"))
    stock_qty = Column(Numeric(18, 2))
    stock_value = Column(Numeric(18, 2))
    aging_days = Column(Integer)
