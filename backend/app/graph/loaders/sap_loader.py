class SAPLoader:
    def __init__(self, graph_service):
        self.graph_service = graph_service

    def load_sales_order(self, sales_order):
        query = """
        MERGE (s:SalesOrder {salesOrder: $so_number})
        WITH s
        MATCH (c:Customer {customerCode: $customer_code})
        MERGE (c)-[:PLACES]->(s)
        """
        self.graph_service.run_query(query, {
            "so_number": sales_order.get("sales_order_number"),
            "customer_code": sales_order.get("customer_id") # Assuming customer_id maps to customerCode for demo
        })
