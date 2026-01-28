# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo with separate frontend and backend directories:

```
ai-resume-chat/
├── frontend/          # Vite + React + TypeScript
├── backend/           # FastAPI + Python
├── docker-compose.yml # Local development
├── Dockerfile         # Production build
└── railway.json       # Railway deployment config
```

## Commands

### Frontend Commands

```bash
cd frontend
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run lint         # Run ESLint
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
```

Run a single test file:
```bash
cd frontend
npx vitest run src/test/example.test.ts
```

### Backend Commands

```bash
cd backend
pip install -e .              # Install dependencies
uvicorn app.main:app --reload # Start dev server on port 8000
pytest                        # Run backend tests
```

### Full Stack Development

```bash
# Terminal 1: Backend
cd backend && uvicorn app.main:app --reload --port 8000

# Terminal 2: Frontend
cd frontend && npm run dev
```

Frontend dev server proxies /api/* requests to backend.

## Architecture

This is an interactive resume website for Joseph Fajen featuring a real AI chat interface powered by Anthropic Claude.

### Backend (FastAPI)

- `backend/app/main.py` - FastAPI entry point with lifespan management
- `backend/app/core/config.py` - Settings singleton with pydantic-settings
- `backend/app/core/logging.py` - Structured logging with structlog
- `backend/app/core/middleware.py` - Request logging and CORS
- `backend/app/core/agent.py` - Claude system prompt configuration
- `backend/app/api/chat.py` - SSE streaming chat endpoint
- `backend/app/api/contact.py` - Contact form submission
- `backend/app/api/health.py` - Health check endpoints

### Frontend (React + Vite)

All resume content lives in `frontend/src/data/joseph-fajen.ts`:
- Profile info, experience, skills, documented failures
- `demoResponses` - Fallback responses if API unavailable
- `fitAssessments` - Strong/weak fit evaluations

Components render from this data file. To change resume content, edit the data file, not the components.

**Experience data structure:** Each experience entry has an `aiContext` object with richer detail for AI responses:
```ts
{
  company: "Datadog",
  role: "Staff Engineer, Platform Infrastructure",
  period: "2021–Present",
  highlights: ["..."],  // Displayed in UI
  aiContext: {          // Used by AI chat for deeper answers
    situation: "...",   // What was the problem/context
    approach: "...",    // How did they tackle it
    technicalWork: "...", // Specific technical details
    lessonsLearned: "..." // Retrospective insight
  }
}
```

### AI Chat Integration

`frontend/src/components/AIChat.tsx` uses real Claude API via backend:
- SSE streaming with @microsoft/fetch-event-source
- Fallback to demo responses if backend unavailable
- Profile context sent with each request

### Page Composition

`frontend/src/pages/Index.tsx` composes the single-page layout:
```
Header → Hero → Experience → FitAssessment → Contact → Footer
         ↓
      AIChat (modal overlay, triggered by "Ask AI About Me" button)
```

### UI Components

Uses shadcn/ui pattern - components copied into `frontend/src/components/ui/` (not npm installed). These are Radix UI primitives with Tailwind styling.

### Styling

- Tailwind with CSS variables for theming (defined in `frontend/src/index.css`)
- Custom animations: `animate-fade-in`, `animate-slide-up`, `animate-pulse-soft`
- Colors use semantic tokens: `bg-background`, `text-foreground`, `bg-accent`, etc.

## TypeScript Configuration

Relaxed settings for rapid development:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`

Path alias: `@/` maps to `src/`

## Environment Variables

Backend requires:
```bash
ANTHROPIC_API_KEY=sk-ant-...
```

Copy `backend/.env.example` to `backend/.env` and add your API key.
