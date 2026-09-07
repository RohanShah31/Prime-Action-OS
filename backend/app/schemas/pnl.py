from pydantic import BaseModel, ConfigDict
from decimal import Decimal

class PnLResponse(BaseModel):
    id: int
    fiscal_year: int
    revenue: Decimal
    cogs: Decimal
    gross_profit: Decimal
    operating_expense: Decimal
    ebitda: Decimal
    net_profit: Decimal
    
    model_config = ConfigDict(from_attributes=True)