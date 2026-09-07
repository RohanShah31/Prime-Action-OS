from fastapi import APIRouter
from app.services.ai.root_cause_service import RootCauseService

router = APIRouter(prefix="/api/rootcause", tags=["Diagnostics"])

@router.get("/{kpi}")
def get_root_cause(kpi: str):
    service = RootCauseService(graph_service=None)
    return service.analyze(kpi)
