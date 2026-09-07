class ImpactService:
    def __init__(self, graph_service):
        self.graph_service = graph_service

    def analyze_impact(self, action_id: int):
        # Simulate the Cypher traversal: MATCH (a:Action)-[:AFFECTS]->(t:SAPTable) RETURN t
        
        # For demo purposes, returning a mock response
        return [
            {"object_type": "VBAK", "impact": "Pricing"},
            {"object_type": "VBAP", "impact": "Sales Items"},
            {"object_type": "KONV", "impact": "Conditions"}
        ]
