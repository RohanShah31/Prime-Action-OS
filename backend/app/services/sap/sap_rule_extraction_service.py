class SAPRuleExtractionService:
    def extract_rules(self, metadata):
        rules = []
        # Transform SAP metadata into business rules
        rules.append({
            "rule_type": "Discount Approval",
            "source": "Pricing Procedure",
            "condition": "Discount > 10%",
            "action": "Manager Approval Required"
        })
        return rules
