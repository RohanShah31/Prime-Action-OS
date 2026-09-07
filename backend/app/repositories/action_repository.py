from app.models.action import ActionMaster
from app.repositories.base import BaseRepository
from sqlalchemy.orm import Session

class ActionRepository(BaseRepository[ActionMaster]):
    def __init__(self, db: Session):
        super().__init__(db, ActionMaster)

    def get_pending_actions(self) -> list[ActionMaster]:
        # Only fetch actions that are waiting for human review
        return self.db.query(ActionMaster).filter(ActionMaster.status == "Pending").all()