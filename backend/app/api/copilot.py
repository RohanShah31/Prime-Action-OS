from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.ai.copilot import ActionCopilot
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/copilot", tags=["Copilot"])

class ChatMessage(BaseModel):
    message: str

@router.post("/chat")
async def chat_stream(payload: ChatMessage, db: Session = Depends(get_db)):
    copilot = ActionCopilot(db)
    return StreamingResponse(
        copilot.stream_chat(payload.message),
        media_type="text/event-stream"
    )
