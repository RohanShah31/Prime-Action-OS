class RootCauseService:
    def __init__(self, graph_service):
        self.graph_service = graph_service

    def analyze(self, kpi_name: str):
        # Simulate the Cypher traversal: MATCH (k:KPI {name:$kpi})<-[:IMPACTS*1..5]-(root) RETURN root
        
        # For demo purposes, returning a mock response
        return {
            "root_causes": [
                "Pricing Leakage",
                "Vendor Cost Increase",
                "Inventory Obsolescence"
            ]
        }
