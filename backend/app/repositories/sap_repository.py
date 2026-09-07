from app.models.sap_observation import SAPObservation
from app.repositories.base import BaseRepository
from sqlalchemy.orm import Session

class SAPRepository(BaseRepository[SAPObservation]):
    def __init__(self, db: Session):
        super().__init__(db, SAPObservation)

    def get_by_action_id(self, action_id: int) -> list[SAPObservation]:
        return self.db.query(SAPObservation).filter(SAPObservation.action_id == action_id).all()