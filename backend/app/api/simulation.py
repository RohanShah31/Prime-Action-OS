from fastapi import APIRouter
from pydantic import BaseModel
from app.simulation.montecarlo import MonteCarloEngine

router = APIRouter(prefix="/api/simulation", tags=["Simulation"])

class SimulationRequest(BaseModel):
    scenario_id: int = 1

@router.post("/run")
def run_simulation(payload: SimulationRequest):
    engine = MonteCarloEngine()
    return engine.run()
