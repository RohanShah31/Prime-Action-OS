from decimal import Decimal

class ApprovalMatrixService:
    def determine_approver(self, benefit: Decimal) -> str:
        if benefit < 1000000:
            return "Process Owner"
        if benefit < 5000000:
            return "Finance Director"
        if benefit < 50000000:
            return "Controller"
        return "CFO"
