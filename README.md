# AI-Powered Interactive Resume

An interactive resume website with a real AI chat interface powered by Anthropic Claude. Instead of a static PDF that gets a 10-second glance, this creates a 5-minute conversation where recruiters and hiring managers can ask questions and get honest, specific answers.

**Live demo:** [Coming soon]

## Quick Start

### Prerequisites

- Anthropic API key ([get one here](https://console.anthropic.com/))
- **For Docker:** Docker Desktop
- **For native development:** Node.js 18+ and Python 3.12+

### Initial Setup (Required for All Methods)

```bash
# Clone and enter the project
git clone <repo-url>
cd ai-resume-chat

# Configure your API key
cp backend/.env.example backend/.env
# Edit backend/.env and add your ANTHROPIC_API_KEY
```

---

## Running the Application

### Option 1: Docker Compose (Recommended for Quick Start)

**Best for:** First-time setup, demos, testing the full stack without installing dependencies.

```bash
# Start both services (frontend + backend)
docker compose up

# Or run in background (detached mode)
docker compose up -d
```

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:8080  |
| Backend  | http://localhost:8000  |

**Stop the services:**

```bash
# If running in foreground: Ctrl+C

# If running in background (-d):
docker compose down

# Stop and remove all data (clean slate):
docker compose down -v --rmi local
```

**View logs (when running in background):**

```bash
docker compose logs -f           # All services
docker compose logs -f frontend  # Frontend only
docker compose logs -f backend   # Backend only
```

**Rebuild after code changes:**

```bash
docker compose up --build
```

---

### Option 2: Native Development (Recommended for Active Development)

**Best for:** Iterating on code, debugging, faster hot-reload, IDE integration.

**One-time setup:**

```bash
# Backend dependencies
cd backend
pip install -e .

# Frontend dependencies
cd ../frontend
npm install
```

**Start services (requires two terminals):**

```bash
# Terminal 1: Backend (port 8000)
cd backend
uvicorn app.main:app --reload --port 8000

# Terminal 2: Frontend (port 8080)
cd frontend
npm run dev
```

**Stop:** Press `Ctrl+C` in each terminal.

Visit http://localhost:8080. The frontend proxies `/api/*` requests to the backend.

---

## When to Use Each Method

| Scenario | Recommended | Why |
|----------|-------------|-----|
| **First time running the project** | Docker | No dependency installation needed |
| **Quick demo or testing** | Docker | Single command, consistent environment |
| **Active frontend development** | Native | Faster hot-reload, better IDE integration |
| **Active backend development** | Native | Easier debugging, faster iteration |
| **CI/CD pipelines** | Docker | Reproducible builds |
| **Production deployment** | Docker (single-service) | See Deployment section below |

**Hybrid approach:** Run backend natively for debugging while using Docker for other services, or vice versa. Just ensure ports don't conflict.

---

## Project Structure

```
ai-resume-chat/
├── frontend/                    # React + Vite + TypeScript
│   └── src/
│       ├── components/          # UI components
│       │   └── AIChat.tsx       # Chat interface + context builder
│       └── data/
│           └── joseph-fajen.ts  # All profile content (single source of truth)
├── backend/                     # FastAPI + Python
│   └── app/
│       ├── api/
│       │   └── chat.py          # Streaming chat endpoint
│       └── core/
│           └── agent.py         # System prompt template
├── docker-compose.yml           # Local development
├── Dockerfile                   # Production build
└── railway.json                 # Railway deployment
```

---

## Everyday Commands

### Frontend

```bash
cd frontend
npm run dev          # Start dev server (http://localhost:8080)
npm run build        # Production build
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

### Backend

```bash
cd backend
uvicorn app.main:app --reload --port 8000   # Start dev server
pytest                                       # Run tests
```

### Testing the Chat API Directly

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is your experience with API documentation?", "profile_context": "Name: Joseph Fajen"}'
```

---

## Customizing the AI: Prompt Architecture

The AI's behavior is controlled by **5 files**. Here's what each does and when to edit it:

### 1. System Prompt Template
**File:** `backend/app/core/agent.py`

This defines Claude's **personality, boundaries, and instructions**. Edit this to change:
- How Claude should respond (tone, length, honesty level)
- Professional boundaries (what topics to deflect)
- Handling of common question types

```python
SYSTEM_PROMPT = """You are helping hiring managers...

CORE INSTRUCTIONS:
- Be specific. Use actual details from his experience...
...
"""
```

### 2. Profile Content (Your Resume Data)
**File:** `frontend/src/data/joseph-fajen.ts`

This is the **single source of truth** for all content about you. The AI references this data to answer questions.

```typescript
export const josephProfile = {
  name: "Joseph Fajen",
  title: "Senior Technical Writer",
  experience: [
    {
      company: "IOHK",
      role: "Senior Technical Writer",
      highlights: ["..."],           // Displayed in UI
      aiContext: {                   // Used by AI for deeper answers
        situation: "...",            // What was the problem/context
        approach: "...",             // How did you tackle it
        technicalWork: "...",        // Specific technical details
        lessonsLearned: "..."        // Retrospective insight
      }
    }
  ],
  skills: { strong: [...], moderate: [...], gaps: [...] },
  failures: [...]                    // Documented failures (honesty!)
};
```

### 3. Context Builder (What Claude Actually Sees)
**File:** `frontend/src/components/AIChat.tsx` (lines 25-49)

The `buildProfileContext()` function formats your profile data into a string that gets sent to Claude with each request. Edit this to change **which information Claude receives**.

```typescript
const buildProfileContext = () => {
  return `
Name: ${josephProfile.name}
Title: ${josephProfile.title}
...
`;
};
```

### 4. Suggested Questions
**File:** `frontend/src/components/AIChat.tsx` (lines 17-22)

These are the starter questions users see when they open the chat.

```typescript
const suggestedQuestions = [
  "Would this person be good for a Series B startup with messy data infrastructure?",
  "Tell me about their biggest failure.",
  ...
];
```

### 5. Demo/Fallback Responses
**File:** `frontend/src/data/joseph-fajen.ts`

When the API is unavailable, the frontend falls back to these canned responses. Keep them consistent with the AI's tone.

```typescript
export const demoResponses = {
  default: `Based on Joseph's background...`,
  aiExperience: `Joseph's AI experience is recent but substantial...`,
  ...
};
```

---

## Prompt Tuning Workflow

1. **Start with the system prompt** (`backend/app/core/agent.py`) — get the personality right
2. **Enrich your profile data** (`frontend/src/data/joseph-fajen.ts`) — add specific details Claude can reference
3. **Test with real questions** — use the chat or curl to see responses
4. **Adjust the context builder** if Claude isn't getting the right information
5. **Update fallback responses** to match the AI's tone

### Tips for Effective Prompts

- **Be specific about what you DON'T want** — "Don't oversell" is clearer than "be humble"
- **Include example handling** — "If asked about salary, say: ..."
- **Use the `aiContext` structure** — situation/approach/technicalWork/lessonsLearned gives Claude rich context
- **Document real failures** — builds trust and gives Claude honest content to share

---

## Environment Variables

### Backend (`backend/.env`)

```bash
# Required
ANTHROPIC_API_KEY=sk-ant-...

# Optional
LOG_LEVEL=INFO
ENVIRONMENT=development
```

---

## Deployment

### Production Architecture

In production, the app runs as a **single Docker container**: FastAPI serves both the API and the pre-built frontend as static files. This differs from local development where frontend and backend run separately.

```
┌─────────────────────────────────────┐
│         Production Container         │
│  ┌─────────────────────────────────┐│
│  │          FastAPI                ││
│  │  /api/*  → Chat, Contact, Health││
│  │  /*      → Static frontend files││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### Deploy to Railway

1. Connect your GitHub repository to Railway
2. Set `ANTHROPIC_API_KEY` in Railway environment variables
3. Railway auto-detects `railway.json` for build/start commands

### Manual Production Build

```bash
# Build frontend and copy to backend/static/
cd frontend && npm run build && cp -r dist ../backend/static

# Build production Docker image
docker build -t ai-resume .

# Run production container
docker run -p 8000:8000 -e ANTHROPIC_API_KEY=sk-ant-... ai-resume
```

### Docker Files Explained

| File | Purpose |
|------|---------|
| `docker-compose.yml` | **Local development** - runs frontend and backend as separate containers with hot-reload |
| `Dockerfile` (root) | **Production** - single container serving both API and static frontend |
| `backend/Dockerfile` | Production backend build (requires pre-built frontend in `backend/static/`) |
| `backend/Dockerfile.dev` | Development backend build (no static files needed) |
| `frontend/Dockerfile.dev` | Development frontend build with hot-reload |

---

## Architecture Notes

- **Streaming responses:** Uses Server-Sent Events (SSE) for real-time token delivery
- **Rate limiting:** 20 requests/minute per IP (configurable in `backend/app/api/chat.py`)
- **No database:** Stateless conversations, no persistence
- **Fallback mode:** If API fails, frontend uses demo responses

---

## Contributing

This is a personal resume project, but the architecture could be adapted for other portfolios.

## License

MIT
