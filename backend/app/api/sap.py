from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.sap_observation import SAPObservationResponse
from app.repositories.sap_repository import SAPRepository
from app.services.sap_service import SAPService

router = APIRouter(prefix="/api/sap", tags=["SAP Data"])

def get_sap_service(db: Session = Depends(get_db)) -> SAPService:
    repo = SAPRepository(db)
    return SAPService(repo)

@router.get("/action/{action_id}", response_model=list[SAPObservationResponse])
def get_sap_observations(action_id: int, service: SAPService = Depends(get_sap_service)):
    """Fetch all SAP findings linked to a specific AI action."""
    return service.get_observations_for_action(action_id)