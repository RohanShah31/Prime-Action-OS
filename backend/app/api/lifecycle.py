from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.lifecycle import StatusChangeRequest, AssignmentRequest, CommentRequest
from app.services.lifecycle_service import LifecycleService
from app.services.audit_service import AuditService
from app.models.action_lifecycle import ActionAssignment, ActionComment

router = APIRouter(prefix="/api/lifecycle", tags=["Lifecycle"])

@router.post("/status")
def change_status(request: StatusChangeRequest, db: Session = Depends(get_db)):
    service = LifecycleService()
    # In a real app we'd fetch the current status from DB. For now, assume it's valid.
    service.update_status(
        db,
        action_id=request.action_id,
        current_status="Pending",  # Mocked
        new_status=request.new_status,
        user=request.changed_by
    )
    return {"message": "Status updated successfully"}

@router.post("/assign")
def assign_action(request: AssignmentRequest, db: Session = Depends(get_db)):
    assignment = ActionAssignment(
        action_id=request.action_id,
        assigned_to=request.assigned_to,
        assigned_by=request.assigned_by,
        status="Assigned"
    )
    db.add(assignment)
    db.commit()
    return {"message": "Action assigned successfully"}

@router.post("/comment")
def add_comment(request: CommentRequest, db: Session = Depends(get_db)):
    comment = ActionComment(
        action_id=request.action_id,
        author=request.author,
        comment=request.comment
    )
    db.add(comment)
    db.commit()
    return {"message": "Comment added successfully"}
