from fastapi import APIRouter
from app.digital_twin.process_twin import ProcessTwin
from app.process_mining.bottleneck import BottleneckService

router = APIRouter(prefix="/api/mining", tags=["Process Mining"])

@router.get("/o2c")
def process_mining_o2c():
    twin = ProcessTwin()
    return twin.discover_process("O2C")

@router.get("/bottlenecks")
def process_bottlenecks():
    service = BottleneckService()
    return service.detect(process_log=None)
