from pydantic import BaseModel, ConfigDict
from decimal import Decimal

class SAPObservationResponse(BaseModel):
    id: int
    action_id: int
    sap_table: str
    observation: str
    financial_impact: Decimal
    confidence_score: Decimal
    
    model_config = ConfigDict(from_attributes=True)