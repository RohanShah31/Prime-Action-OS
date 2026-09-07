from fastapi import APIRouter
from app.services.ai.impact_service import ImpactService

router = APIRouter(prefix="/api/impact", tags=["Impact Analysis"])

@router.get("/{action_id}")
def get_action_impact(action_id: int):
    service = ImpactService(graph_service=None)
    return service.analyze_impact(action_id)
