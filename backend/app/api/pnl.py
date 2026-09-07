from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.pnl import PnLResponse
from app.repositories.pnl_repository import PnLRepository
from app.services.pnl_service import PnLService

# Import your new gatekeeper dependency and user model
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/pnl", tags=["Financials (P&L)"])

def get_pnl_service(db: Session = Depends(get_db)) -> PnLService:
    repo = PnLRepository(db)
    return PnLService(repo)


@router.get("/current", response_model=PnLResponse)
def get_current_pnl(
    service: PnLService = Depends(get_pnl_service),
    current_user: User = Depends(get_current_user) # 🔒 This locks the door!
):
    """Get the latest Profit & Loss snapshot for the dashboard (Requires Login)."""
    pnl = service.get_latest_financials()
    if not pnl:
        raise HTTPException(status_code=404, detail="No financial data found.")
    return pnl