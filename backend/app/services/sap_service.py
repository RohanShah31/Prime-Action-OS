from app.repositories.sap_repository import SAPRepository
from app.models.sap_observation import SAPObservation

class SAPService:
    def __init__(self, sap_repo: SAPRepository):
        self.sap_repo = sap_repo

    def get_observations_for_action(self, action_id: int) -> list[SAPObservation]:
        return self.sap_repo.get_by_action_id(action_id)