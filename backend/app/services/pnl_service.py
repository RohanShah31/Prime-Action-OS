from app.repositories.pnl_repository import PnLRepository
from app.models.pnl import PnLSnapshot

class PnLService:
    def __init__(self, pnl_repo: PnLRepository):
        self.pnl_repo = pnl_repo

    def get_latest_financials(self) -> PnLSnapshot:
        """Fetch the most recent P&L snapshot."""
        pnl_record = self.pnl_repo.latest()
        
        # If the database is empty, we can return a default or raise an error
        # For now, let's return None if empty so the API can handle it
        return pnl_record