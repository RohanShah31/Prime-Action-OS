class RiskTwin:
    def risk_score(self):
        return {
            "overall": 42,
            "compliance": 12,
            "operational": 30
        }

    def control_effectiveness(self):
        return {
            "discount_approvals": "Failing",
            "segregation_of_duties": "Passing"
        }
