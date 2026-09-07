from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.action import ActionResponse, ActionStatusUpdate
from app.repositories.action_repository import ActionRepository
from app.services.action_service import ActionService

# Import security dependencies 🔒
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/actions", tags=["AI Actions"])

def get_action_service(db: Session = Depends(get_db)) -> ActionService:
    repo = ActionRepository(db)
    return ActionService(repo)

@router.get("/pending", response_model=list[ActionResponse])
def get_pending_actions(
    service: ActionService = Depends(get_action_service),
    current_user: User = Depends(get_current_user)  # Protected!
):
    """Fetch all AI-recommended actions that need review (Requires Login)."""
    return service.get_all_pending_actions()

@router.get("/all", response_model=list[ActionResponse])
def get_all_actions(
    service: ActionService = Depends(get_action_service),
    current_user: User = Depends(get_current_user)  # Protected!
):
    """Fetch all AI actions (Requires Login)."""
    return service.get_all_actions()

# ADD THIS ENDPOINT 👇
@router.patch("/{action_id}/status", response_model=ActionResponse)
def update_status(
    action_id: int,
    payload: ActionStatusUpdate,
    service: ActionService = Depends(get_action_service),
    current_user: User = Depends(get_current_user)  # Protected!
):
    """Approve or Reject an AI action by changing its workflow status (Requires Login)."""
    if payload.status not in ["Approved", "Rejected", "Pending"]:
        raise HTTPException(status_code=400, detail="Status must be 'Approved', 'Rejected', or 'Pending'")
        
    updated_action = service.update_action_status(action_id, payload.status)
    if not updated_action:
        raise HTTPException(status_code=404, detail="Action item not found")
        
    return updated_action