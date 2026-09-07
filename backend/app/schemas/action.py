from pydantic import BaseModel, ConfigDict
from decimal import Decimal
from datetime import datetime
from typing import Optional

class ActionCreate(BaseModel):
    action_code: str
    action_name: str
    category: str
    description: str

class ActionResponse(BaseModel):
    id: int
    action_code: str
    action_name: str
    category: str
    description: str
    expected_benefit: Decimal
    implementation_cost: Optional[Decimal] = None
    confidence_score: Decimal
    priority_score: Optional[int] = None
    status: str
    created_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)

class ActionStatusUpdate(BaseModel):
    status: str  # This will accept "Approved" or "Rejected"