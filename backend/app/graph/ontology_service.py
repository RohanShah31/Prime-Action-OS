class OntologyService:
    def __init__(self, graph_service):
        self.graph_service = graph_service

    def setup_constraints(self):
        queries = [
            "CREATE CONSTRAINT company_code IF NOT EXISTS FOR (c:Company) REQUIRE c.companyCode IS UNIQUE;",
            "CREATE CONSTRAINT customer_code IF NOT EXISTS FOR (c:Customer) REQUIRE c.customerCode IS UNIQUE;",
            "CREATE CONSTRAINT material_code IF NOT EXISTS FOR (m:Material) REQUIRE m.materialCode IS UNIQUE;",
            "CREATE CONSTRAINT action_code IF NOT EXISTS FOR (a:Action) REQUIRE a.actionCode IS UNIQUE;"
        ]
        for query in queries:
            try:
                self.graph_service.run_query(query)
            except Exception as e:
                pass # Depending on neo4j version and setup, constraint creation might fail if it exists
