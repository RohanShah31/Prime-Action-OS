import json
import asyncio
import aiohttp
from typing import AsyncGenerator
from sqlalchemy.orm import Session
from app.repositories.pnl_repository import PnLRepository
from app.repositories.action_repository import ActionRepository

OLLAMA_URL = "http://localhost:11434/api/generate"

ANOMALY_ANALYSIS_PROMPT = """You are an expert financial auditor AI.
Review the following P&L snapshot and pending actions.
Analyze any anomalies and suggest improvements.
"""

ROOT_CAUSE_PROMPT = """You are an expert supply chain and financial analyst.
Analyze the root cause for the following pending actions.
"""

FINANCIAL_IMPACT_PROMPT = """You are a CFO AI assistant.
Determine the financial impact of the pending actions on the overall P&L.
"""

class ActionCopilot:
    def __init__(self, db: Session):
        self.db = db
        self.pnl_repo = PnLRepository(db)
        self.action_repo = ActionRepository(db)

    async def get_context(self) -> str:
        # Fetch PnL snapshot
        pnl = self.pnl_repo.get_all(limit=1)
        pnl_data = pnl[0].__dict__ if pnl else {}
        if "_sa_instance_state" in pnl_data:
            del pnl_data["_sa_instance_state"]
        
        # Fetch pending actions
        actions = self.action_repo.get_pending_actions()
        actions_data = [{"action_code": a.action_code, "action_name": a.action_name, "expected_benefit": float(a.expected_benefit)} for a in actions]
        
        context = f"Context:\nRecent P&L: {pnl_data}\nPending Actions: {actions_data}\n"
        return context

    async def stream_chat(self, message: str) -> AsyncGenerator[str, None]:
        context = await self.get_context()
        
        try:
            import os
            import openai
            from dotenv import load_dotenv
            
            load_dotenv()
            api_key = os.getenv("OPENROUTER_API_KEY")
            
            if not api_key:
                raise ValueError("No API Key")

            client = openai.OpenAI(
                base_url="https://openrouter.ai/api/v1",
                api_key=api_key,
            )
            
            system_prompt = (
                "You are the PrimeActionOS CFO Copilot, an enterprise AI assistant analyzing SAP ERP data. "
                "Keep your answers extremely concise (1 sentence maximum). "
                f"{context}"
            )

            completion = client.chat.completions.create(
                model="qwen/qwen-2.5-72b-instruct",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": message}
                ],
                max_tokens=150,
                temperature=0.7,
                extra_headers={
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "PrimeActionOS"
                }
            )
            
            response_text = completion.choices[0].message.content
        except Exception as e:
            print(f"Fallback due to: {e}")
            response_text = "I am currently disconnected from my secure cloud node. Please verify my API keys in the `.env` file."
            
        # Simulate thinking and network delay
        await asyncio.sleep(0.5)
        
        # Simulate streaming by sending word by word
        words = response_text.split()
        for i, word in enumerate(words):
            chunk = word + (" " if i < len(words) - 1 else "")
            # Ensure JSON format is exactly what frontend expects
            json_str = json.dumps({"text": chunk})
            yield f"data: {json_str}\n\n"
            await asyncio.sleep(0.02) # Typewriter effect
