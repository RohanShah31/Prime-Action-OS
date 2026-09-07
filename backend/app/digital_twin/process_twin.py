class ProcessTwin:
    def discover_process(self, process_name: str):
        return {
            "process": process_name,
            "status": "Discovered",
            "variants": 15
        }

    def variants(self):
        return ["Standard path", "Approval bypass", "Rework loop"]

    def bottlenecks(self):
        return ["Manager Approval Delay", "Credit Check Failure"]
