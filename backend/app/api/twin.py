from fastapi import APIRouter
from app.digital_twin.financial_twin import FinancialTwin

router = APIRouter(prefix="/api/twin", tags=["Digital Twin"])

@router.get("/state")
def twin_state():
    twin = FinancialTwin()
    return twin.current_state()
