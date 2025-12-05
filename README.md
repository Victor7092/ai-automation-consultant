# 🤖 Automation Consultant

> **Transform manual workflows into intelligent automation blueprints—powered by AI.**

Automation Consultant is an AI-powered React dashboard that helps businesses architect automation workflows. Simply describe your manual process, and our AI Agent delivers a complete technical blueprint including a visual node graph, recommended tech stack, and step-by-step logic.

---

## ✨ Features

- **📝 Interactive Intake Form** – Capture industry, role, manual tasks, tools, triggers, and goals in a clean, intuitive interface.
- **🧠 AI Architect Agent** – Powered by Google Gemini via n8n, the AI analyzes your input and generates a custom automation blueprint.
- **🔗 Visual Node Graph** – See your workflow as a step-by-step visual diagram with tools, actions, and descriptions.
- **🛠️ Smart Tech Stack** – Get tailored SaaS tool recommendations with connection types (native, API, webhook).
- **📋 One-Click Copy** – Export the entire blueprint to your clipboard for easy sharing or documentation.

---

## 📋 Prerequisites

Before you begin, ensure you have the following:

- **Node.js v18+** – [Download here](https://nodejs.org/)
- **n8n Instance** – Self-hosted or cloud instance with Google Gemini integration

---

## 🚀 Setup Guide

### **Backend (n8n)**

1. **Import the Workflow**
   - Open your n8n instance
   - Navigate to **Workflows** → **Import from File**
   - Select `workflow.json` from this repository

2. **Configure Google Gemini Credentials**
   - In the imported workflow, locate the **Google Gemini** node
   - Click **Credentials** → **Create New**
   - Enter your **Gemini API Key** ([Get one here](https://aistudio.google.com/app/apikey))
   - Save the credentials

3. **Activate the Workflow**
   - Click the **Active** toggle in the top-right corner
   - Ensure the workflow status shows as **Active**

4. **Copy the Production Webhook URL**
   - Click on the **Webhook** node (first node in the workflow)
   - Copy the **Production URL** (e.g., `https://your-n8n-instance.com/webhook/consultant`)
   - You'll need this for the frontend setup

---

### **Frontend (React)**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ai-automation-consultant.git
   cd ai-automation-consultant
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Update API Endpoint**
   - Open `src/App.tsx`
   - Locate line 32:
     ```typescript
     const API_ENDPOINT = 'N8N_LINK';
     ```
   - Replace with your **Production Webhook URL** from Step 4 above

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   - Open [http://localhost:5173](http://localhost:5173) in your browser

---

<div align="center">
  <strong>Built with ❤️ by automation enthusiasts</strong>
</div>
