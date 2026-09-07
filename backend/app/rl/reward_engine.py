class RewardEngine:
    def calculate_reward(self, ebitda_gain, implementation_cost, risk_penalty):
        # Reinforcement Learning reward function
        return ebitda_gain - implementation_cost - risk_penalty
