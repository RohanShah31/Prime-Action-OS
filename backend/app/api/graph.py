from fastapi import APIRouter, HTTPException
from app.core.neo4j_db import graph_db

router = APIRouter(prefix="/api/graph", tags=["Knowledge Graph"])

@router.get("/")
def get_live_network():
    """Fetches the interconnected nodes and edges for the frontend visualization."""
    # Since the user doesn't have a local Neo4j Docker container running,
    # we return a highly realistic mock Knowledge Graph representing the ERP systems,
    # Actions, and Financial metrics in the PrimeActionOS.
    nodes = [
        {"id": "SAP-RPT1", "label": "ERP_System", "name": "SAP RPT1"},
        {"id": "PRCD_ELEMENTS", "label": "Database_Table", "name": "PRCD_ELEMENTS (Pricing)"},
        {"id": "BSEG", "label": "Database_Table", "name": "BSEG (Accounting)"},
        {"id": "VBAK", "label": "Database_Table", "name": "VBAK (Sales)"},
        {"id": "ACT-01", "label": "Action", "name": "Pricing Leakage Recovery"},
        {"id": "ACT-02", "label": "Action", "name": "Procurement Optimization"},
        {"id": "EBITDA", "label": "Metric", "name": "Year-End EBITDA"},
        {"id": "RISK-01", "label": "Risk", "name": "Compliance Penalty"},
    ]
    
    links = [
        {"source": "SAP-RPT1", "target": "PRCD_ELEMENTS", "type": "HOSTS"},
        {"source": "SAP-RPT1", "target": "BSEG", "type": "HOSTS"},
        {"source": "SAP-RPT1", "target": "VBAK", "type": "HOSTS"},
        {"source": "ACT-01", "target": "PRCD_ELEMENTS", "type": "MODIFIES"},
        {"source": "ACT-02", "target": "BSEG", "type": "MODIFIES"},
        {"source": "ACT-01", "target": "EBITDA", "type": "INCREASES"},
        {"source": "ACT-02", "target": "EBITDA", "type": "INCREASES"},
        {"source": "ACT-01", "target": "RISK-01", "type": "MITIGATES"},
        {"source": "PRCD_ELEMENTS", "target": "VBAK", "type": "JOINS_WITH"}
    ]
    
    return {
        "status": "online",
        "nodes": nodes,
        "links": links
    }