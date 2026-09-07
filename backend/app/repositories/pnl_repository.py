from app.models.pnl import PnLSnapshot
from app.repositories.base import BaseRepository
from sqlalchemy.orm import Session

class PnLRepository(BaseRepository[PnLSnapshot]):
    def __init__(self, db: Session):
        super().__init__(db, PnLSnapshot)

    def latest(self) -> PnLSnapshot | None:
        # Custom query to get the most recent financial snapshot
        return self.db.query(PnLSnapshot).order_by(PnLSnapshot.id.desc()).first()