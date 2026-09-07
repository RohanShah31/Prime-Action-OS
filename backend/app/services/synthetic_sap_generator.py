import random

class SyntheticSAPGenerator:
    def generate_observations(self):
        return [
            {
                "sap_table": "KONV",
                "observation": "Discount exceeds policy threshold",
                "financial_impact": 2500000,
                "confidence": 94
            },
            {
                "sap_table": "EKKO",
                "observation": "Vendor pricing variance detected",
                "financial_impact": 1800000,
                "confidence": 91
            },
            {
                "sap_table": "MARD",
                "observation": "Inventory aging above threshold",
                "financial_impact": 4200000,
                "confidence": 95
            }
        ]
