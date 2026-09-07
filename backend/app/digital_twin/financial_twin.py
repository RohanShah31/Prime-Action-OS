class FinancialTwin:
    def current_state(self):
        # Base state of the financial engine
        return {
            "ebitda": 100000000,
            "revenue": 1000000000,
            "cash_flow": 50000000
        }

    def projected_state(self, action_id: int = None):
        # Forecasted state after actions
        base = self.current_state()
        if action_id:
            # Simulate a standard bump
            base["ebitda"] *= 1.15
        return base

    def impact_of_action(self, action_id: int):
        return {
            "action_id": action_id,
            "ebitda_impact": 15000000,
            "cash_flow_impact": 8000000
        }
