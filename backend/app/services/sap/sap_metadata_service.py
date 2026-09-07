class SAPMetadataService:
    def scan_metadata(self):
        # Skeleton for scanning SAP dictionary and exposing available objects
        return {
            "tables": ["VBAK", "VBAP", "KONV", "VBRK", "VBRP", "EKKO", "EKPO", "MARA", "MARD", "BKPF", "BSEG"],
            "cds_views": ["I_SalesOrder", "I_BillingDocument", "C_SalesOrderCube"],
            "transactions": ["VA01", "VA02", "VK11", "VF01"],
            "workflows": ["Discount Approval Workflow", "Pricing Escalation Workflow"]
        }
