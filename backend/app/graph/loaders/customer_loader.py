class CustomerLoader:
    def __init__(self, graph_service):
        self.graph_service = graph_service

    def load_customer(self, customer):
        query = """
        MERGE (c:Customer {customerCode: $code})
        SET c.name = $name, c.segment = $segment, c.region = $region
        """
        self.graph_service.run_query(query, {
            "code": customer.get("customer_code"),
            "name": customer.get("customer_name"),
            "segment": customer.get("segment"),
            "region": customer.get("region")
        })
