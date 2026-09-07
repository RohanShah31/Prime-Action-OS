from app.core.database import SessionLocal
from app.models.pnl import PnLSnapshot
from app.models.action import ActionMaster
from app.models.action_observation import ActionObservation

def seed_database():
    db = SessionLocal()
    try:
        # Clear existing to ensure fresh seed
        db.query(ActionObservation).delete()
        db.query(ActionMaster).delete()
        db.query(PnLSnapshot).delete()

        print("Seeding P&L Snapshots...")
        pnl_data = [
            PnLSnapshot(fiscal_year=2024, revenue=4500000, cogs=1800000, gross_profit=2700000, operating_expense=1100000, ebitda=1600000, net_profit=1200000),
            PnLSnapshot(fiscal_year=2025, revenue=4800000, cogs=1900000, gross_profit=2900000, operating_expense=1150000, ebitda=1750000, net_profit=1350000),
            PnLSnapshot(fiscal_year=2026, revenue=5000000, cogs=2000000, gross_profit=3000000, operating_expense=1200000, ebitda=1800000, net_profit=1400000)
        ]
        db.add_all(pnl_data)

        print("Seeding 10 Mock AI Actions into MySQL...")
        actions_data = [
            ActionMaster(action_code="ACT-001", action_name="Pricing Leakage Recovery Program", category="Revenue", description="Identify and recover unbilled services.", expected_benefit=150000.00, implementation_cost=10000.00, confidence_score=95.0, priority_score=1, status="Pending"),
            ActionMaster(action_code="ACT-002", action_name="Optimize Supplier Logistics", category="Logistics", description="Consolidate duplicate shipments.", expected_benefit=45000.00, implementation_cost=5000.00, confidence_score=92.5, priority_score=2, status="Pending"),
            ActionMaster(action_code="ACT-003", action_name="Warehouse Automation", category="Operations", description="Automate picking process.", expected_benefit=120000.00, implementation_cost=40000.00, confidence_score=85.0, priority_score=3, status="Pending"),
            ActionMaster(action_code="ACT-004", action_name="Procurement Renegotiation", category="Cost Reduction", description="Renegotiate raw material contracts.", expected_benefit=80000.00, implementation_cost=2000.00, confidence_score=90.0, priority_score=4, status="Pending"),
            ActionMaster(action_code="ACT-005", action_name="Marketing ROI Optimization", category="Marketing", description="Shift ad spend to higher converting channels.", expected_benefit=60000.00, implementation_cost=1500.00, confidence_score=88.0, priority_score=5, status="Pending"),
            ActionMaster(action_code="ACT-006", action_name="IT Infrastructure Cloud Migration", category="IT", description="Move on-prem servers to cloud.", expected_benefit=95000.00, implementation_cost=25000.00, confidence_score=82.0, priority_score=6, status="Pending"),
            ActionMaster(action_code="ACT-007", action_name="Energy Efficiency Program", category="Facilities", description="Install smart thermostats and LED lighting.", expected_benefit=25000.00, implementation_cost=8000.00, confidence_score=98.0, priority_score=7, status="Pending"),
            ActionMaster(action_code="ACT-008", action_name="Customer Retention Initiative", category="Sales", description="Launch loyalty program.", expected_benefit=110000.00, implementation_cost=15000.00, confidence_score=86.0, priority_score=8, status="Pending"),
            ActionMaster(action_code="ACT-009", action_name="Inventory Lean Optimization", category="Supply Chain", description="Reduce safety stock levels.", expected_benefit=70000.00, implementation_cost=5000.00, confidence_score=89.0, priority_score=9, status="Pending"),
            ActionMaster(action_code="ACT-010", action_name="Accounts Receivable Acceleration", category="Finance", description="Implement automated dunning.", expected_benefit=40000.00, implementation_cost=3000.00, confidence_score=94.0, priority_score=10, status="Pending")
        ]
        db.add_all(actions_data)
        db.flush()

        print("Seeding Action Observations...")
        obs_data = []
        sap_data = []
        
        sap_mappings = {
            "ACT-001": {"table": "KONV, VBAK, VBAP", "obs": "18% of revenue originates from accounts with net gross margins <8%.", "impact": 150000.00},
            "ACT-002": {"table": "EKKO, EKPO, LIKP", "obs": "Duplicate shipment routes identified across 12 vendor hubs.", "impact": 45000.00},
            "ACT-003": {"table": "LQUA, MSEG, MKPF", "obs": "Picking delays exceed 40 mins due to unoptimized slotting.", "impact": 120000.00},
            "ACT-004": {"table": "EINA, EINE, EKBE", "obs": "Raw material purchase variance of 15% across plants.", "impact": 80000.00},
            "ACT-005": {"table": "CE1XXXX, COPA", "obs": "Ad spend in territory 4 yields negative contribution margins.", "impact": 60000.00},
            "ACT-006": {"table": "CSKS, COEP", "obs": "On-prem server maintenance costs exceed cloud benchmarks by 28%.", "impact": 95000.00},
            "ACT-007": {"table": "PMCO, AFIH", "obs": "Utility expenditures spike 30% during non-production hours.", "impact": 25000.00},
            "ACT-008": {"table": "KNA1, KNVV", "obs": "Customer churn rate increased by 4% in key demographics.", "impact": 110000.00},
            "ACT-009": {"table": "MARA, MARD, MBEW", "obs": "$50M finished goods inventory stagnant for 365+ days.", "impact": 70000.00},
            "ACT-010": {"table": "BSID, BSIK, BSEG", "obs": "DSO metrics exceed industry standard by 35 days.", "impact": 40000.00},
        }

        for action in actions_data:
            obs_data.append(ActionObservation(action_id=action.id, observation_type="DATA_ANOMALY", detail="Found mismatched records", severity="HIGH"))
            from app.models.sap_observation import SAPObservation
            
            mapping = sap_mappings.get(action.action_code)
            if mapping:
                sap_data.append(SAPObservation(
                    action_id=action.id, 
                    sap_table=mapping["table"], 
                    observation=mapping["obs"], 
                    financial_impact=mapping["impact"], 
                    confidence_score=92.5
                ))
            else:
                sap_data.append(SAPObservation(
                    action_id=action.id, 
                    sap_table="BKPF", 
                    observation="Anomaly detected.", 
                    financial_impact=15000.00, 
                    confidence_score=85.0
                ))

        db.add_all(obs_data)
        db.add_all(sap_data)

        db.commit()
        print("Database fully updated and seeded!")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()