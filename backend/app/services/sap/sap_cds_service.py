class SAPCDSService:
    def list_views(self):
        return ["I_SalesOrder", "I_BillingDocument", "C_SalesOrderCube"]

    def get_view_definition(self, view_name: str):
        return {"view": view_name, "definition": "CDS view skeleton"}
