from pydantic import BaseModel

class StatusChangeRequest(BaseModel):
    action_id: int
    new_status: str
    changed_by: str

class AssignmentRequest(BaseModel):
    action_id: int
    assigned_to: str
    assigned_by: str

class CommentRequest(BaseModel):
    action_id: int
    author: str
    comment: str
