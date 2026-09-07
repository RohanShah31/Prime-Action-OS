from app.repositories.action_repository import ActionRepository
from app.models.action import ActionMaster

class ActionService:
    def __init__(self, action_repo: ActionRepository):
        self.action_repo = action_repo

    def get_all_pending_actions(self) -> list[ActionMaster]:
        return self.action_repo.get_pending_actions()

    def get_all_actions(self) -> list[ActionMaster]:
        return self.action_repo.get_all()

    # ADD THIS METHOD 👇
    def update_action_status(self, action_id: int, new_status: str) -> ActionMaster | None:
        """Find an action and update its workflow status."""
        action = self.action_repo.get(action_id)
        if not action:
            return None
        
        action.status = new_status
        self.action_repo.db.commit()
        self.action_repo.db.refresh(action)
        return action