from app.services.audit_service import AuditService

VALID_TRANSITIONS = {
    "Generated": ["Under Review", "Pending"],
    "Pending": ["Approved", "Rejected"],
    "Under Review": ["Approved", "Rejected"],
    "Approved": ["Assigned", "Pending"],
    "Rejected": ["Pending"],
    "Assigned": ["In Progress"],
    "In Progress": ["Implemented"],
    "Implemented": ["Benefit Realized"],
    "Benefit Realized": ["Closed"]
}

class LifecycleService:
    def can_transition(self, current_status: str, new_status: str) -> bool:
        allowed = VALID_TRANSITIONS.get(current_status, [])
        return new_status in allowed

    def update_status(self, db_session, action_id: int, current_status: str, new_status: str, user: str):
        if not self.can_transition(current_status, new_status):
            raise ValueError(f"Invalid transition from {current_status} to {new_status}")
            
        audit_service = AuditService()
        audit_service.create_audit(
            db_session,
            action_id=action_id,
            old_status=current_status,
            new_status=new_status,
            user=user
        )
        return True
