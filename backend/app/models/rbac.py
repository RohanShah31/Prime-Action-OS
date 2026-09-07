from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Numeric
from app.core.database import Base

class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True)
    role_name = Column(String(100))

class Permission(Base):
    __tablename__ = "permissions"
    id = Column(Integer, primary_key=True)
    permission_name = Column(String(255))

class UserRole(Base):
    __tablename__ = "user_roles"
    user_id = Column(Integer, primary_key=True)
    role_id = Column(Integer, primary_key=True)

class RolePermission(Base):
    __tablename__ = "role_permissions"
    role_id = Column(Integer, primary_key=True)
    permission_id = Column(Integer, primary_key=True)

class ApprovalMatrix(Base):
    __tablename__ = "approval_matrix"
    id = Column(Integer, primary_key=True)
    min_benefit = Column(Numeric(18,2))
    max_benefit = Column(Numeric(18,2))
    approver_role = Column(String(100))
