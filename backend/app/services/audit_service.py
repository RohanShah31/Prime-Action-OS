from app.models.action_lifecycle import ActionAudit

class AuditService:
    def create_audit(
        self,
        db_session,
        action_id: int,
        old_status: str,
        new_status: str,
        user: str
    ):
        audit = ActionAudit(
            action_id=action_id,
            event_type="STATUS_CHANGE",
            old_status=old_status,
            new_status=new_status,
            changed_by=user
        )
        db_session.add(audit)
        db_session.commit()
        db_session.refresh(audit)
        return audit
