from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import engine, Base

# Import models to ensure they are registered before create_all
from app.models import pnl, action, action_observation, sap_observation, user, action_lifecycle, rbac, sap_metadata, organization, master_data, transaction, kpi, decision, sap_object

# Import the API routers
from app.api.auth import router as auth_router
from app.api.graph import router as graph_router
from app.api.ai_analysis import router as ai_router
from app.api.sap import router as sap_router
from app.api.pnl import router as pnl_router
from app.api.action import router as action_router
from app.api.copilot import router as copilot_router
from app.api.lifecycle import router as lifecycle_router
from app.api.approval_matrix import router as approval_matrix_router
from app.api.sap_intelligence import router as sap_intelligence_router
from app.api.graphrag import router as graphrag_router
from app.api.rootcause import router as rootcause_router
from app.api.impact import router as impact_router
from app.api.twin import router as twin_router
from app.api.mining import router as mining_router
from app.api.simulation import router as simulation_router

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Allows Next.js frontend
    allow_credentials=True,
    allow_methods=["*"], # Allows GET, POST, etc.
    allow_headers=["*"],
)

# Register API routers
app.include_router(pnl_router)
app.include_router(action_router)
app.include_router(sap_router)
app.include_router(auth_router)
app.include_router(ai_router)
app.include_router(graph_router)
app.include_router(copilot_router)
app.include_router(lifecycle_router)
app.include_router(approval_matrix_router)
app.include_router(sap_intelligence_router)
app.include_router(graphrag_router)
app.include_router(rootcause_router)
app.include_router(impact_router)
app.include_router(twin_router)
app.include_router(mining_router)
app.include_router(simulation_router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Prime Action OS API",
        "status": "Online",
        "database": "Connected"
    }