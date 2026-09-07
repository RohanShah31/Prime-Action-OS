# PrimeActionOS 🚀

**PrimeActionOS** is a high-fidelity, full-stack Enterprise AI platform prototype designed to act as an "Executive Copilot" for CFOs and operations leaders. It bridges the gap between raw enterprise data (like SAP ERPs) and strategic decision-making by analyzing anomalies, projecting financial impacts (EBITDA, P&L), and generating AI-driven recommendations.

## 🌟 Key Features

- **Executive Command Center:** A stunning, light-mode dashboard that visualizes the operational health of the enterprise, highlighting active revenue leakages and procurement bottlenecks.
- **AI CFO Copilot (Live LLM Integration):** Features a live streaming chat interface powered by **Qwen-2.5-72B-Instruct** (via OpenRouter). The Copilot securely ingests the current enterprise state and answers strategic financial questions dynamically.
- **Enterprise Digital Twin:** An interactive knowledge graph visualization that maps the relationships between SAP tables (e.g., `VBAK`, `EKKO`), business processes, and detected anomalies.
- **Action Workbench:** A Kanban-style board allowing executives to simulate, approve, or reject AI-generated mitigation strategies (e.g., "Automated Discount Approval Governance").
- **SAP Mock Integration:** A robust backend architecture designed to interface with ERP data, complete with "Transport Request" generation workflows for simulated SAP deployment.

## 🏗️ Architecture Stack

This project is built using modern, production-ready enterprise standards:

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI Library:** React, Material-UI (MUI) v5
- **Visualizations:** Recharts (Data Dashboards), Custom SVG Graphing
- **Styling:** Tailwind-inspired utility classes via MUI System

### Backend
- **Framework:** FastAPI (Python 3.13)
- **Database:** MySQL 9.7
- **ORM & Data Validation:** SQLAlchemy 2.0 & Pydantic
- **AI Integration:** OpenAI Python SDK routed to OpenRouter API (Qwen 2.5)
- **Concurrency:** Asyncio for non-blocking LLM streaming and database operations

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.11+)
- MySQL Server (v8+)

### 1. Database Setup
Ensure your MySQL server is running. Create a database named `prime_action_os`.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure your environment variables in `backend/.env`:
   ```env
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_DATABASE=prime_action_os
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## 🛡️ Security & Scalability
This prototype is designed with modularity in mind. The `ai_service.py` securely handles API keys server-side, preventing leakage to the client. The database layer utilizes SQLAlchemy session management to prevent SQL injection and ensure scalable connection pooling.

---
*Built as a Proof of Concept for Next-Generation Enterprise AI Architecture.*
