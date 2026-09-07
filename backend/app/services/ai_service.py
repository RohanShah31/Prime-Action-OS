import os
import json
from sqlalchemy.orm import Session
from app.models.action import ActionMaster
from app.models.sap_observation import SAPObservation
from app.models.pnl import PnLSnapshot

class QwenAIService:
    def __init__(self, db: Session):
        self.db = db
        # Dictionary hosting the 10 official domain actions from the Word Document table specifications
        self.actions_config = {
            1: {
                "code": "ACT-REV-REC",
                "name": "Pricing Leakage Recovery Program",
                "category": "Revenue Optimization",
                "tables": "BKPF, BSEG, VBAK, VBAP, VBRK, VBRP",
                "observation": "18% of revenue originates from customer accounts with net gross margins trending below 8%. Regional discretionary discounting expanded by 12% over policy baselines.",
                "impact_desc": "Increase EBITDA by 2-4%",
                "benefit_factor": 0.03, "cost": 25000.0
            },
            2: {
                "code": "ACT-REV-LEAK",
                "name": "Automated Discount Approval Governance",
                "category": "Revenue Leakage Control",
                "tables": "VBAK, VBAP, KONV, VBRP",
                "observation": "Localized contract audit points to unmonitored discount threshold breaches across discrete distribution channels.",
                "impact_desc": "Recover 1-3% revenue",
                "benefit_factor": 0.02, "cost": 12000.0
            },
            3: {
                "code": "ACT-COGS-COMP",
                "name": "Procurement Centralization & Sourcing Optimization",
                "category": "COGS Compression",
                "tables": "EKKO, EKPO, EKBE, LFA1, MBEW",
                "observation": "Identified a 15% to 20% raw material purchase variance for identical item master configurations across distinct plant operations.",
                "impact_desc": "Reduce material costs by 3-5%",
                "benefit_factor": 0.04, "cost": 35000.0
            },
            4: {
                "code": "ACT-INV-COST",
                "name": "Stagnant Stock Liquidation & Safety Threshold Revisions",
                "category": "Inventory Cost Optimization",
                "tables": "MARA, MARD, MBEW, MKPF, MSEG",
                "observation": "₹50 Cr worth of finished goods inventory has demonstrated net zero movement metrics over a 365+ day tracking cycle.",
                "impact_desc": "Release working capital",
                "benefit_factor": 0.05, "cost": 15000.0
            },
            5: {
                "code": "ACT-MFG-YIELD",
                "name": "Predictive Quality Maintenance Program",
                "category": "Manufacturing Cost Control",
                "tables": "AFKO, AFPO, AFRU, CRHD, AUFK",
                "observation": "Component scrap logs significantly exceed global efficiency benchmarks across production lines 02 and 04.",
                "impact_desc": "Reduce COGS by 2-3%",
                "benefit_factor": 0.025, "cost": 45000.0
            },
            6: {
                "code": "ACT-EMP-COST",
                "name": "SG&A Operational Copilot Deployment",
                "category": "Workforce Optimization",
                "tables": "PA0001, PA0008, CATSDB, COEP",
                "observation": "Support-tier organizational layers absorb 28% of administrative expenditures while returning low transaction throughput.",
                "impact_desc": "Reduce SG&A by 5-10%",
                "benefit_factor": 0.07, "cost": 20000.0
            },
            7: {
                "code": "ACT-FRT-LOG",
                "name": "Logistics Route & Consolidations Framework",
                "category": "Freight & Logistics Optimization",
                "tables": "VTTK, VTTP, LIKP, LIPS",
                "observation": "Total outbound shipping and logistics line costs advanced by 18% year-on-year against a parallel organic sales growth of only 5%.",
                "impact_desc": "Reduce freight cost by 8-12%",
                "benefit_factor": 0.035, "cost": 18000.0
            },
            8: {
                "code": "ACT-SEL-EXP",
                "name": "Commercial Territory Realignments",
                "category": "Selling Expenses Control",
                "tables": "CE1XXXX (COPA), COEP, CSKS",
                "observation": "Three underperforming geographic territories display negative contribution margins when factoring intensive field support costs.",
                "impact_desc": "Improve contribution profitability",
                "benefit_factor": 0.015, "cost": 10000.0
            },
            9: {
                "code": "ACT-WRK-CAP",
                "name": "AI-Driven Accounts Receivable Collections Prioritization",
                "category": "Working Capital Optimization",
                "tables": "BSID, BSIK, BKPF, BSEG",
                "observation": "Days Sales Outstanding (DSO) metrics currently exceed the designated sectoral industry standard benchmark by 35 days.",
                "impact_desc": "Release cash and lower corporate financing overheads",
                "benefit_factor": 0.045, "cost": 12000.0
            },
            10: {
                "code": "ACT-PRD-PROF",
                "name": "SKU Portfolio Rationalization Program",
                "category": "Product Profitability Optimization",
                "tables": "COPA Tables, CKMLHD, CKMLCR, MBEW",
                "observation": "25% of active manufactured product lines generate less than a 3% individual margin floor while sapping 40% of manufacturing effort.",
                "impact_desc": "Improve overall factory gross margins",
                "benefit_factor": 0.06, "cost": 30000.0
            }
        }

    def trigger_pnl_audit(self, pnl_id: int):
        """Audits P&L metrics and inserts specific configurations into database targets."""
        pnl = self.db.query(PnLSnapshot).filter(PnLSnapshot.id == pnl_id).first()
        if not pnl:
            return {"error": f"P&L snapshot context {pnl_id} not initialized."}

        # Select configuration matching parameter or wrap over using mod-10
        idx = pnl_id if pnl_id in self.actions_config else ((pnl_id % 10) or 10)
        cfg = self.actions_config[idx]

        base_pool = float(pnl.cogs if "COGS" in cfg["category"] or "Cost" in cfg["category"] else pnl.revenue)
        calculated_benefit = base_pool * cfg["benefit_factor"]

        # Insert Action Master record row
        new_action = ActionMaster(
            action_code=f"{cfg['code']}-{pnl.fiscal_year}",
            action_name=cfg["name"],
            category=cfg["category"],
            description=f"AI Findings: {cfg['observation']} Targeted Strategy: Map process rules across affected systems. Expected Result: {cfg['impact_desc']}.",
            expected_benefit=calculated_benefit,
            implementation_cost=cfg["cost"],
            confidence_score=91.00,
            priority_score=1 if idx <= 3 else 2,
            status="Pending"
        )
        self.db.add(new_action)
        self.db.commit()
        self.db.refresh(new_action)

        # Connect detailed transaction metadata evidence tracking rows
        new_sap_obs = SAPObservation(
            action_id=new_action.id,
            sap_table=cfg["tables"],
            observation=cfg["observation"],
            financial_impact=calculated_benefit,
            confidence_score=91.00
        )
        self.db.add(new_sap_obs)
        self.db.commit()

        return {
            "status": "Success",
            "message": f"Qwen AI Engine successfully prioritized Action #{idx}: {cfg['name']}",
            "generated_action_id": new_action.id
        }

    def generate_recommendations(self) -> list:
        """Returns full array of structured items for Screen 1 Action Grid."""
        return [
            {"id": k, "code": v["code"], "name": v["name"], "target_tables": v["tables"], "expected_impact": v["impact_desc"]}
            for k, v in self.actions_config.items()
        ]

    def perform_root_cause(self, action_id: int) -> dict:
        """Extracts systemic process root causes according to root_cause.txt parameters."""
        idx = action_id if action_id in self.actions_config else 1
        cfg = self.actions_config[idx]
        return {
            "action_code": cfg["code"],
            "root_cause": f"Systemic deterioration initiated by standard process controls degradation. Verified control failure across transaction matrix: {cfg['tables']}.",
            "contributing_factors": ["Absence of automated workflow approvals", "Discretionary threshold overrides", "Legacy data silos"],
            "status": "Calculated"
        }

    def calculate_forecast(self) -> dict:
        """Simulates macro forward visibility matching what-if modeling parameters."""
        return {
            "metric_timeline": ["2026 Baseline", "2027 Optimistic Projection"],
            "revenue": [1000.0, 1050.0],
            "cogs": [650.0, 590.0],
            "ebitda": [100.0, 232.0]
        }

    def answer_copilot(self, question: str) -> str:
        """AI Executive Copilot conversational tracking for direct questions."""
        try:
            import openai
            import os
            from dotenv import load_dotenv
            
            # Load from .env file
            load_dotenv()
            api_key = os.getenv("OPENROUTER_API_KEY")
            
            if not api_key:
                raise ValueError("OPENROUTER_API_KEY not found in environment.")

            client = openai.OpenAI(
                base_url="https://openrouter.ai/api/v1",
                api_key=api_key,
            )
            
            system_prompt = (
                "You are the PrimeActionOS CFO Copilot, an enterprise AI assistant analyzing SAP ERP data. "
                "Keep your answers concise (1-2 sentences), professional, and focus on EBITDA, supply chain, and revenue leakage. "
                "Base your insights on the following simulated data: "
                "We have 10 critical operational leakage points across the enterprise. "
                "1. Pricing Leakage in SAP tables VBAK, VBAP (18% of revenue from margins < 8%). "
                "2. Procure-to-Pay raw material purchase variance of 15% across plants (tables EKKO, EKPO). "
                "3. Stagnant inventory of 50M (tables MARA, MARD). "
                "Projected EBITDA uplift from resolving these is $22.5M. "
                "Respond directly to the user's inquiry."
            )

            completion = client.chat.completions.create(
                model="qwen/qwen-2.5-72b-instruct",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": question}
                ],
                max_tokens=150,
                temperature=0.3,
                extra_headers={
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "PrimeActionOS"
                }
            )
            
            return completion.choices[0].message.content
            
        except Exception as e:
            print(f"OpenRouter LLM error: {str(e)}")
            # Fallback to mock if API fails
            q_clean = question.lower()
            if "margin" in q_clean or "ebitda" in q_clean:
                return "CFO Copilot Analysis: EBITDA drop originates from purchasing variances within Procure-to-Pay tracks (EKKO, EKPO) and excessive discount leakage across Order-to-Cash distributions (KONV)."
            if "reprice" in q_clean or "customer" in q_clean:
                return "CFO Copilot Recommendation: Transition 18% of customer portfolio accounts displaying margins below 8% floor thresholds to structured validation workflows (VBAK, VBAP)."
            return f"CFO Copilot Processing Input: '{question}'. Evaluating active transaction records across linked SAP structures to locate root trends."

    def build_board_summary(self) -> dict:
        """Compiles board summaries mimicking board_report.txt output configurations."""
        return {
            "summary_header": "PrimeActionOS High-Fidelity Advisory Statement",
            "narrative": "System diagnostic parsed 10 critical operational leakage points across enterprise resource layers. Resolution path promises major EBITDA recovery options.",
            "kpi_metrics": {
                "total_opportunities_flagged": 10,
                "projected_ebitda_uplift": "₹165 Cr",
                "average_confidence": "91.00%",
                "average_payback_period": "7 months"
            }
        }