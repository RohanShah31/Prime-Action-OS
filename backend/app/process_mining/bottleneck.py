class BottleneckService:
    def detect(self, process_log):
        # Skeleton to detect temporal bottlenecks
        return [
            {
                "activity": "Manager Approval",
                "avg_duration_hours": 72,
                "impact": "High"
            },
            {
                "activity": "Credit Check",
                "avg_duration_hours": 24,
                "impact": "Medium"
            }
        ]
