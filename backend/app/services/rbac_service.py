class RBACService:
    def has_permission(self, role: str, permission: str) -> bool:
        mapping = {
            "CFO": ["*"],
            "Controller": ["approve", "review", "assign"],
            "Finance Director": ["review", "assign"],
            "Process Owner": ["implement", "review"],
            "Viewer": ["read"]
        }
        allowed = mapping.get(role, [])
        return "*" in allowed or permission in allowed
