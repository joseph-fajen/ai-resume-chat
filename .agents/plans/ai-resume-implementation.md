# Feature: AI-Powered Interactive Resume

The following plan should be complete, but it's important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils, types, and models. Import from the right files etc.

## Feature Description

Transform the existing demo interactive resume into a production-ready AI-powered professional portfolio for Joseph Fajen. This replaces the current keyword-matching demo responses with real Anthropic Claude integration, adds a contact form, restructures the project into a monorepo with FastAPI backend and Vite frontend, and prepares for Railway deployment.

## User Story

As a recruiter, hiring manager, or technical interviewer,
I want to ask natural language questions about Joseph's professional background,
So that I can efficiently evaluate fit and get honest, detailed answers without scheduling a call.

## Problem Statement

The current implementation uses keyword-matching to select from pre-written responses, which limits conversation depth and cannot handle unexpected questions. The site needs real AI integration to enable natural, contextual conversations while maintaining professional guardrails.

## Solution Statement

1. Restructure the project into a monorepo with `frontend/` and `backend/` directories
2. Create a FastAPI backend with Anthropic Claude integration and SSE streaming
3. Update the frontend AIChat component to consume real streaming API responses
4. Add a contact form for recruiter outreach
5. Update profile data from "Marcus Chen" to "Joseph Fajen"
6. Configure for Railway deployment with Docker

## Feature Metadata

**Feature Type**: New Capability (AI Integration) + Enhancement (Contact Form)
**Estimated Complexity**: High
**Primary Systems Affected**: AIChat component, data layer, new backend service
**Dependencies**: Anthropic Python SDK, FastAPI, sse-starlette, @microsoft/fetch-event-source

---

## CONTEXT REFERENCES

### Relevant Codebase Files IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

- `src/components/AIChat.tsx` (lines 1-197) - Why: Core component to update for real API; contains current demo response logic, typing animation, message state management
- `src/data/marcus-profile.ts` (lines 1-202) - Why: Data structure to rename/update; contains systemPrompt, experience with aiContext, failures, fitAssessments
- `src/pages/Index.tsx` (lines 1-28) - Why: Page composition showing how AIChat is mounted as modal
- `src/components/Header.tsx` (lines 1-113) - Why: Contains LinkedIn/GitHub placeholders to update
- `src/components/Footer.tsx` (lines 1-52) - Why: Contains social links to update
- `src/components/Hero.tsx` (lines 1-71) - Why: Uses marcusProfile data import pattern
- `src/App.tsx` (lines 1-28) - Why: Shows React Query setup already in place
- `vite.config.ts` (lines 1-22) - Why: Need to add proxy configuration for development
- `package.json` (lines 1-89) - Why: Frontend dependencies, scripts
- `PRD.md` (full file) - Why: Contains complete requirements, API specs, architecture decisions

### New Files to Create

**Backend:**
- `backend/app/__init__.py` - Package init
- `backend/app/main.py` - FastAPI entry point with static file serving
- `backend/app/core/__init__.py` - Package init
- `backend/app/core/config.py` - Settings singleton (pydantic-settings)
- `backend/app/core/agent.py` - Claude agent configuration with system prompt
- `backend/app/api/__init__.py` - Package init
- `backend/app/api/chat.py` - Chat endpoint with SSE streaming
- `backend/app/api/contact.py` - Contact form endpoint
- `backend/pyproject.toml` - Python dependencies and project config
- `backend/Dockerfile` - Container build for Railway

**Frontend (moved/updated):**
- `frontend/` - Move entire current project here
- `frontend/src/data/joseph-fajen.ts` - Renamed profile data (replace marcus-profile.ts)
- `frontend/src/components/ContactForm.tsx` - New contact form component

**Root:**
- `docker-compose.yml` - Local development orchestration
- `railway.json` - Railway deployment config

### Relevant Documentation YOU SHOULD READ BEFORE IMPLEMENTING!

- [Anthropic Claude Streaming Messages](https://platform.claude.com/docs/en/api/messages-streaming)
  - Specific section: Event types, Python SDK streaming
  - Why: Core pattern for backend streaming implementation

- [FastAPI SSE with sse-starlette](https://pypi.org/project/sse-starlette/)
  - Why: Production SSE implementation for FastAPI

- [@microsoft/fetch-event-source npm](https://www.npmjs.com/package/@microsoft/fetch-event-source)
  - Why: Client-side SSE with POST body support (needed for sending messages)

- [Vite Proxy Configuration](https://vitejs.dev/config/server-options#server-proxy)
  - Why: Development proxy to backend

- [Railway FastAPI Deployment](https://docs.railway.com/guides/fastapi)
  - Why: Deployment configuration patterns

### Patterns to Follow

**Frontend Component Pattern (from existing codebase):**
```tsx
// Component with props interface
interface ComponentNameProps {
  propName: type;
  onAction?: () => void;
}

const ComponentName = ({ propName, onAction }: ComponentNameProps) => {
  const [state, setState] = useState<Type>(initialValue);

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Content */}
      </div>
    </section>
  );
};

export default ComponentName;
```

**Data Import Pattern:**
```tsx
import { marcusProfile } from "@/data/marcus-profile";
// Becomes:
import { josephProfile } from "@/data/joseph-fajen";
```

**Styling Pattern (Tailwind classes from codebase):**
- Sections: `py-24 px-6`, `max-w-4xl mx-auto`
- Cards: `bg-card border border-border rounded-2xl`
- Buttons: `px-6 py-3 rounded-xl bg-accent text-accent-foreground`
- Text: `text-foreground`, `text-muted-foreground`, `font-serif` for headings
- Animations: `animate-fade-in`, `animate-slide-up`

**FastAPI Backend Pattern (standard):**
```python
# config.py - Settings singleton
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    anthropic_api_key: str
    environment: str = "development"

    class Config:
        env_file = ".env"

settings = Settings()
```

```python
# main.py - FastAPI entry
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.include_router(chat_router, prefix="/api")
app.mount("/", StaticFiles(directory="static", html=True), name="static")
```

**SSE Streaming Pattern:**
```python
# Backend: chat.py
from sse_starlette.sse import EventSourceResponse

async def generate_stream(message: str, history: list):
    async with anthropic_client.messages.stream(...) as stream:
        async for text in stream.text_stream:
            yield {"event": "token", "data": json.dumps({"content": text})}
    yield {"event": "done", "data": "{}"}

@router.post("/chat")
async def chat(request: ChatRequest):
    return EventSourceResponse(generate_stream(request.message, request.history))
```

```typescript
// Frontend: AIChat.tsx
import { fetchEventSource } from "@microsoft/fetch-event-source";

const sendMessage = async (message: string) => {
  await fetchEventSource("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, conversation_history: messages }),
    onmessage(event) {
      if (event.event === "token") {
        const data = JSON.parse(event.data);
        setDisplayedResponse(prev => prev + data.content);
      }
    },
  });
};
```

---

## IMPLEMENTATION PLAN

### Phase 1: Project Restructure

**Goal:** Reorganize into monorepo structure without breaking existing functionality

**Tasks:**
- Create `frontend/` and `backend/` directory structure
- Move all existing source files to `frontend/`
- Update frontend configuration paths
- Create backend skeleton with pyproject.toml
- Verify frontend still builds and runs independently

### Phase 2: Backend Foundation

**Goal:** Minimal FastAPI backend with Claude streaming integration

**Tasks:**
- Implement FastAPI application structure
- Create settings configuration with environment variables
- Implement Claude agent with system prompt from profile data
- Create `/api/chat` endpoint with SSE streaming
- Create `/api/contact` endpoint placeholder
- Create `/health` endpoint
- Add Dockerfile for containerization
- Test backend independently with curl

### Phase 3: Frontend Integration

**Goal:** Connect frontend to real backend API

**Tasks:**
- Install `@microsoft/fetch-event-source` dependency
- Update `AIChat.tsx` to use real API with streaming
- Add Vite proxy configuration for development
- Rename profile data file to `joseph-fajen.ts`
- Update all imports from marcus-profile to joseph-fajen
- Add ContactForm component
- Update Header/Footer with real LinkedIn/GitHub links
- Test full flow locally

### Phase 4: Deployment Configuration

**Goal:** Production-ready deployment setup

**Tasks:**
- Configure FastAPI to serve built frontend static files
- Create docker-compose.yml for local development
- Create railway.json for Railway deployment
- Add rate limiting to chat endpoint
- Implement contact form email delivery (placeholder for email service)
- Final mobile responsiveness testing

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

### Phase 1: Project Restructure

#### 1.1 CREATE directory structure

- **IMPLEMENT**: Create `frontend/` and `backend/` directories at project root
- **PATTERN**: Standard monorepo structure per PRD.md section 6
- **VALIDATE**: `ls -la` shows both directories

```bash
mkdir -p frontend backend/app/core backend/app/api
```

#### 1.2 MOVE frontend files

- **IMPLEMENT**: Move all existing src/, public/, config files to frontend/
- **PATTERN**: Keep exact same structure inside frontend/
- **IMPORTS**: No changes needed yet
- **GOTCHA**: Don't move .git, .claude, .agents, PRD.md, CLAUDE.md (keep at root)
- **VALIDATE**: `ls frontend/` shows src/, public/, package.json, vite.config.ts, etc.

```bash
# Files/dirs to move to frontend/:
# src/, public/, index.html, package.json, package-lock.json,
# vite.config.ts, vitest.config.ts, tsconfig.json, tsconfig.app.json,
# tsconfig.node.json, eslint.config.js, tailwind.config.ts,
# postcss.config.js, components.json, README_lovable.md
```

#### 1.3 UPDATE frontend config paths

- **IMPLEMENT**: Verify all frontend configs still work from frontend/ directory
- **PATTERN**: Paths are relative, should work without changes
- **VALIDATE**: `cd frontend && npm install && npm run build`

#### 1.4 CREATE backend pyproject.toml

- **IMPLEMENT**: Create Python project configuration
- **PATTERN**: Modern Python packaging with pyproject.toml
- **IMPORTS**: Dependencies: fastapi, uvicorn, anthropic, pydantic-settings, sse-starlette, python-multipart
- **VALIDATE**: File exists at `backend/pyproject.toml`

```toml
[project]
name = "ai-resume-backend"
version = "1.0.0"
description = "FastAPI backend for AI-powered resume"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn[standard]>=0.32.0",
    "anthropic>=0.40.0",
    "pydantic-settings>=2.6.0",
    "sse-starlette>=2.1.0",
    "python-multipart>=0.0.12",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "httpx>=0.27.0",
]
```

#### 1.5 CREATE backend __init__.py files

- **IMPLEMENT**: Create package init files
- **VALIDATE**: Files exist

```bash
touch backend/app/__init__.py
touch backend/app/core/__init__.py
touch backend/app/api/__init__.py
```

### Phase 2: Backend Foundation

#### 2.1 CREATE backend/app/core/config.py

- **IMPLEMENT**: Settings singleton with pydantic-settings
- **PATTERN**: Environment variable configuration
- **IMPORTS**: `from pydantic_settings import BaseSettings`
- **GOTCHA**: Use `model_config` instead of inner `Config` class (Pydantic v2)
- **VALIDATE**: `python -c "from app.core.config import settings; print(settings)"`

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    anthropic_api_key: str
    environment: str = "development"
    log_level: str = "INFO"

    # Email service (for contact form - implement later)
    email_service_api_key: str = ""
    notification_email: str = ""

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }

settings = Settings()
```

#### 2.2 CREATE backend/app/core/agent.py

- **IMPLEMENT**: Claude agent configuration with system prompt
- **PATTERN**: Reference PRD.md systemPrompt requirements
- **IMPORTS**: `import anthropic`
- **GOTCHA**: System prompt must enforce professional boundaries, deflect off-topic
- **VALIDATE**: Import succeeds

```python
import anthropic
from .config import settings

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=settings.anthropic_api_key)

# System prompt based on PRD.md requirements
SYSTEM_PROMPT = """You are helping hiring managers, recruiters, and technical interviewers evaluate Joseph Fajen as a candidate.

CORE INSTRUCTIONS:
- Be specific. Use actual details from his experience, not generic language.
- Be honest about gaps. If someone asks about experience he doesn't have, say so directly.
- When assessing fit for a role, give a genuine assessment including where he might NOT be the right choice.
- Don't oversell. Confidence comes from substance, not superlatives.
- Keep responses conversational but substantive. Aim for 2-4 paragraphs typically.

PROFESSIONAL BOUNDARIES:
- Only discuss professional topics related to Joseph's career, skills, and experience.
- Politely deflect questions about: personal life, political views, salary expectations, or other non-professional topics.
- If asked about salary, say: "I'd recommend discussing compensation directly with Joseph - he's happy to have that conversation at the appropriate stage."

WHAT JOSEPH WANTS YOU TO KNOW:
{profile_context}

HOW TO HANDLE COMMON QUESTIONS:
- "Is he a good fit for X?" → Analyze the role honestly. Match requirements to his actual experience. Name the gaps.
- "What should I ask in an interview?" → Suggest questions that probe his actual decision-making, not rehearsed answers.
- "Tell me about his biggest failure" → He's documented failures honestly. Share them without spin.

WHAT HE EXPLICITLY DOESN'T WANT:
- Don't pretend he has experience he doesn't have
- Don't downplay documented failures
- Don't claim he's "open to anything" — share his actual preferences"""


def get_chat_client():
    """Return the Anthropic client instance."""
    return client


def build_system_prompt(profile_context: str) -> str:
    """Build the system prompt with profile context injected."""
    return SYSTEM_PROMPT.format(profile_context=profile_context)
```

#### 2.3 CREATE backend/app/api/chat.py

- **IMPLEMENT**: Chat endpoint with SSE streaming
- **PATTERN**: Use sse-starlette EventSourceResponse
- **IMPORTS**: `from sse_starlette.sse import EventSourceResponse`
- **GOTCHA**: Must handle connection drops gracefully
- **VALIDATE**: `curl -X POST http://localhost:8000/api/chat -H "Content-Type: application/json" -d '{"message": "Hello"}'`

```python
import json
from typing import AsyncGenerator
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse

from ..core.agent import get_chat_client, build_system_prompt

router = APIRouter()


class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    conversation_history: list[Message] = []
    profile_context: str = ""


async def generate_stream(
    message: str,
    history: list[Message],
    profile_context: str,
) -> AsyncGenerator[dict, None]:
    """Generate SSE stream from Claude API."""
    client = get_chat_client()

    # Build messages list with history
    messages = [{"role": m.role, "content": m.content} for m in history]
    messages.append({"role": "user", "content": message})

    # Build system prompt
    system = build_system_prompt(profile_context)

    try:
        async with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=system,
            messages=messages,
        ) as stream:
            async for text in stream.text_stream:
                yield {
                    "event": "token",
                    "data": json.dumps({"type": "token", "content": text}),
                }

        yield {"event": "done", "data": json.dumps({"type": "done"})}

    except Exception as e:
        yield {
            "event": "error",
            "data": json.dumps({"type": "error", "message": str(e)}),
        }


@router.post("/chat")
async def chat(request: ChatRequest):
    """Stream chat response from Claude."""
    return EventSourceResponse(
        generate_stream(
            request.message,
            request.conversation_history,
            request.profile_context,
        ),
        media_type="text/event-stream",
    )
```

#### 2.4 CREATE backend/app/api/contact.py

- **IMPLEMENT**: Contact form endpoint (email delivery placeholder)
- **PATTERN**: POST endpoint with validation
- **IMPORTS**: Standard FastAPI
- **GOTCHA**: Email service integration deferred - log for now
- **VALIDATE**: `curl -X POST http://localhost:8000/api/contact -H "Content-Type: application/json" -d '{"name": "Test", "email": "test@example.com"}'`

```python
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter()
logger = logging.getLogger(__name__)


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    company: str = ""
    role: str = ""
    message: str = ""


class ContactResponse(BaseModel):
    success: bool
    message: str


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(request: ContactRequest):
    """Submit contact form. Currently logs; will email in production."""

    # Log the contact request (replace with email service later)
    logger.info(
        f"Contact form submission: name={request.name}, "
        f"email={request.email}, company={request.company}, "
        f"role={request.role}, message={request.message[:100]}..."
    )

    # TODO: Implement email delivery with SendGrid/Resend
    # For now, just acknowledge receipt

    return ContactResponse(
        success=True,
        message="Thank you! Joseph will be in touch soon.",
    )
```

#### 2.5 CREATE backend/app/main.py

- **IMPLEMENT**: FastAPI entry point with routers and static file serving
- **PATTERN**: Include routers, add CORS, mount static files
- **IMPORTS**: All routers, FastAPI, CORSMiddleware, StaticFiles
- **GOTCHA**: Static files only mounted in production (when directory exists)
- **VALIDATE**: `cd backend && uvicorn app.main:app --reload`

```python
import logging
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .api import chat, contact
from .core.config import settings

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

app = FastAPI(
    title="AI Resume API",
    description="Backend for Joseph Fajen's AI-powered interactive resume",
    version="1.0.0",
)

# CORS middleware for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(contact.router, prefix="/api", tags=["contact"])


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy", "version": "1.0.0"}


# Mount static files in production (when built frontend exists)
static_dir = Path(__file__).parent.parent.parent / "static"
if static_dir.exists():
    app.mount("/", StaticFiles(directory=str(static_dir), html=True), name="static")
```

#### 2.6 CREATE backend/.env.example

- **IMPLEMENT**: Example environment file
- **VALIDATE**: File exists

```bash
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Environment
ENVIRONMENT=development
LOG_LEVEL=INFO

# Email service (optional for MVP)
EMAIL_SERVICE_API_KEY=
NOTIFICATION_EMAIL=joseph@example.com
```

#### 2.7 CREATE backend/Dockerfile

- **IMPLEMENT**: Production Dockerfile
- **PATTERN**: Multi-stage build, copy frontend build
- **GOTCHA**: Use Python 3.12, install with pip
- **VALIDATE**: `docker build -t ai-resume-backend ./backend`

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY pyproject.toml ./
RUN pip install --no-cache-dir .

# Copy application
COPY app ./app

# Copy built frontend (built separately in CI/CD)
COPY static ./static

# Run with uvicorn
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### 2.8 TEST backend independently

- **IMPLEMENT**: Create backend .env with real API key, run server
- **VALIDATE**:
  ```bash
  cd backend
  cp .env.example .env
  # Add real ANTHROPIC_API_KEY to .env
  pip install -e .
  uvicorn app.main:app --reload --port 8000
  # In another terminal:
  curl http://localhost:8000/health
  curl -N -X POST http://localhost:8000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message": "Hello, tell me about yourself", "profile_context": "Staff engineer with 8 years experience"}'
  ```

### Phase 3: Frontend Integration

#### 3.1 ADD @microsoft/fetch-event-source dependency

- **IMPLEMENT**: Install SSE client library
- **PATTERN**: npm install
- **VALIDATE**: `cd frontend && npm install @microsoft/fetch-event-source`

```bash
cd frontend
npm install @microsoft/fetch-event-source
```

#### 3.2 UPDATE vite.config.ts with proxy

- **IMPLEMENT**: Add development proxy to backend
- **PATTERN**: Vite server.proxy configuration
- **GOTCHA**: Only applies to dev server, not production
- **VALIDATE**: `npm run dev` starts without errors

```typescript
// frontend/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

#### 3.3 RENAME marcus-profile.ts to joseph-fajen.ts

- **IMPLEMENT**: Rename file and update exports
- **PATTERN**: Keep same structure, update name/content placeholders
- **GOTCHA**: Will need actual Joseph content later (Phase 5 in PRD)
- **VALIDATE**: File exists at `frontend/src/data/joseph-fajen.ts`

```typescript
// frontend/src/data/joseph-fajen.ts
// Rename marcusProfile to josephProfile
// Update name, title, etc. to placeholders for now
// Keep the data structure identical
export const josephProfile = {
  name: "Joseph Fajen",
  title: "Staff Engineer", // Update with real title
  subtitle: "Platform infrastructure, developer tools, and technical strategy", // Update
  location: "San Francisco Bay Area", // Update
  status: "Open to Staff+ roles", // Update
  // ... rest of profile
};

// Update other exports similarly
export const demoResponses = { ... };  // Keep for fallback
export const fitAssessments = { ... }; // Update criteria
```

#### 3.4 UPDATE all imports from marcus-profile to joseph-fajen

- **IMPLEMENT**: Find/replace all imports
- **PATTERN**: `import { marcusProfile } from "@/data/marcus-profile"` → `import { josephProfile } from "@/data/joseph-fajen"`
- **FILES**: Hero.tsx, Experience.tsx, FitAssessment.tsx, AIChat.tsx
- **VALIDATE**: `npm run build` succeeds

Files to update:
- `frontend/src/components/Hero.tsx`
- `frontend/src/components/Experience.tsx`
- `frontend/src/components/FitAssessment.tsx`
- `frontend/src/components/AIChat.tsx`

Also update variable references: `marcusProfile` → `josephProfile`

#### 3.5 UPDATE AIChat.tsx for real API integration

- **IMPLEMENT**: Replace keyword matching with real streaming API
- **PATTERN**: Use fetchEventSource for SSE
- **IMPORTS**: `import { fetchEventSource } from "@microsoft/fetch-event-source"`
- **GOTCHA**: Handle connection errors, keep typing animation
- **VALIDATE**: Chat works end-to-end with backend running

Key changes to AIChat.tsx:
1. Import fetchEventSource
2. Replace `getResponse()` with API call
3. Update `handleSubmit()` to use streaming
4. Add error handling state
5. Pass profile_context from josephProfile to API

```typescript
// Key additions to AIChat.tsx
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { josephProfile } from "@/data/joseph-fajen";

// Build profile context string for API
const buildProfileContext = () => {
  return `
Name: ${josephProfile.name}
Title: ${josephProfile.title}
Status: ${josephProfile.status}
Summary: ${josephProfile.summary}

Experience:
${josephProfile.experience.map(exp => `
- ${exp.company} (${exp.period}): ${exp.role}
  ${exp.highlights.join("; ")}
  Context: ${exp.aiContext.situation} ${exp.aiContext.approach}
`).join("")}

Skills - Strong: ${josephProfile.skills.strong.join(", ")}
Skills - Moderate: ${josephProfile.skills.moderate.join(", ")}
Skills - Gaps: ${josephProfile.skills.gaps.join(", ")}

Documented Failures:
${josephProfile.failures.map(f => `- ${f.year}: ${f.title} - ${f.summary}`).join("\n")}
`;
};

// Replace handleSubmit with:
const handleSubmit = async (question: string) => {
  if (!question.trim() || isTyping) return;

  setMessages((prev) => [...prev, { role: "user", content: question }]);
  setInput("");
  setIsTyping(true);
  setDisplayedResponse("");

  let fullResponse = "";

  try {
    await fetchEventSource("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: question,
        conversation_history: messages,
        profile_context: buildProfileContext(),
      }),
      onmessage(event) {
        if (event.event === "token") {
          const data = JSON.parse(event.data);
          fullResponse += data.content;
          setDisplayedResponse(fullResponse);
        } else if (event.event === "done") {
          setIsTyping(false);
          setMessages((prev) => [...prev, { role: "assistant", content: fullResponse }]);
          setDisplayedResponse("");
        } else if (event.event === "error") {
          console.error("Stream error:", event.data);
          setIsTyping(false);
          // Fallback to demo response
          const fallbackResponse = demoResponses.default;
          setMessages((prev) => [...prev, { role: "assistant", content: fallbackResponse }]);
        }
      },
      onerror(err) {
        console.error("SSE error:", err);
        setIsTyping(false);
        // Fallback to demo response
        const fallbackResponse = demoResponses.default;
        setMessages((prev) => [...prev, { role: "assistant", content: fallbackResponse }]);
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    setIsTyping(false);
    // Fallback to demo response
    const fallbackResponse = demoResponses.default;
    setMessages((prev) => [...prev, { role: "assistant", content: fallbackResponse }]);
  }
};
```

#### 3.6 CREATE ContactForm.tsx component

- **IMPLEMENT**: Contact form with validation
- **PATTERN**: Match existing component styling
- **IMPORTS**: React Hook Form (already installed), zod for validation
- **VALIDATE**: Component renders, form submits

```typescript
// frontend/src/components/ContactForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 bg-success-muted border border-success/20 rounded-2xl text-center">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
        <h3 className="text-xl font-serif text-success mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">Joseph will be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Name *</label>
          <input
            {...register("name")}
            className={cn(
              "w-full px-4 py-3 bg-secondary rounded-xl border text-foreground",
              errors.name ? "border-destructive" : "border-border focus:border-accent"
            )}
            placeholder="Your name"
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Email *</label>
          <input
            {...register("email")}
            type="email"
            className={cn(
              "w-full px-4 py-3 bg-secondary rounded-xl border text-foreground",
              errors.email ? "border-destructive" : "border-border focus:border-accent"
            )}
            placeholder="you@company.com"
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Company</label>
          <input
            {...register("company")}
            className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-accent text-foreground"
            placeholder="Your company"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Role</label>
          <input
            {...register("role")}
            className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-accent text-foreground"
            placeholder="Your role"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-muted-foreground mb-2">Message</label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-accent text-foreground resize-none"
          placeholder="What would you like to discuss?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
```

#### 3.7 ADD ContactForm to Index.tsx

- **IMPLEMENT**: Add contact section to page
- **PATTERN**: New section between FitAssessment and Footer
- **VALIDATE**: Contact form visible on page

```typescript
// In frontend/src/pages/Index.tsx
import ContactForm from "@/components/ContactForm";

// Add new section before Footer:
<section id="contact" className="py-24 px-6">
  <div className="max-w-2xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
        Let's Connect
      </h2>
      <p className="text-muted-foreground text-lg">
        Interested in discussing an opportunity? Drop me a message.
      </p>
    </div>
    <div className="bg-card border border-border rounded-2xl p-8">
      <ContactForm />
    </div>
  </div>
</section>
```

#### 3.8 UPDATE Header.tsx with LinkedIn/GitHub links

- **IMPLEMENT**: Add real social links to header
- **PATTERN**: Follow existing desktop nav pattern
- **GOTCHA**: Update placeholder URLs with real profiles
- **VALIDATE**: Links visible in header, open in new tab

Add after "Ask AI" button in desktop nav:
```typescript
<a
  href="https://linkedin.com/in/josephfajen"  // Update with real URL
  target="_blank"
  rel="noopener noreferrer"
  className="text-muted-foreground hover:text-foreground transition-colors"
>
  <Linkedin className="w-5 h-5" />
</a>
<a
  href="https://github.com/josephfajen"  // Update with real URL
  target="_blank"
  rel="noopener noreferrer"
  className="text-muted-foreground hover:text-foreground transition-colors"
>
  <Github className="w-5 h-5" />
</a>
```

#### 3.9 UPDATE Footer.tsx with real links and name

- **IMPLEMENT**: Update name and social links
- **PATTERN**: Keep existing styling
- **VALIDATE**: Footer shows correct name and working links

Update:
- Name: "Marcus Chen" → "Joseph Fajen"
- LinkedIn href: Real LinkedIn URL
- GitHub href: Real GitHub URL
- Email mailto: Real email

#### 3.10 UPDATE AIChat header

- **IMPLEMENT**: Update "Ask AI About Marcus" to "Ask AI About Joseph"
- **FILES**: AIChat.tsx lines 86-94
- **VALIDATE**: Chat modal shows correct name

### Phase 4: Deployment Configuration

#### 4.1 CREATE docker-compose.yml

- **IMPLEMENT**: Local development orchestration
- **PATTERN**: Two services: frontend dev server + backend
- **VALIDATE**: `docker-compose up` starts both services

```yaml
# docker-compose.yml (at project root)
version: "3.8"

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - ENVIRONMENT=development
    volumes:
      - ./backend/app:/app/app
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "8080:8080"
    volumes:
      - ./frontend/src:/app/src
    depends_on:
      - backend
```

#### 4.2 CREATE frontend/Dockerfile.dev

- **IMPLEMENT**: Development Dockerfile for frontend
- **VALIDATE**: `docker-compose up frontend` works

```dockerfile
# frontend/Dockerfile.dev
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

#### 4.3 CREATE railway.json

- **IMPLEMENT**: Railway deployment configuration
- **PATTERN**: Single service serving both backend + static frontend
- **VALIDATE**: File exists at root

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

#### 4.4 CREATE root Dockerfile for production

- **IMPLEMENT**: Multi-stage build: frontend build + backend + serve
- **PATTERN**: Build frontend, copy to backend static directory
- **VALIDATE**: `docker build -t ai-resume .`

```dockerfile
# Dockerfile (at project root)

# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Stage 2: Python backend with frontend static files
FROM python:3.12-slim
WORKDIR /app

# Install Python dependencies
COPY backend/pyproject.toml ./
RUN pip install --no-cache-dir .

# Copy backend application
COPY backend/app ./app

# Copy built frontend to static directory
COPY --from=frontend-build /app/dist ./static

# Expose port and run
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### 4.5 ADD rate limiting to chat endpoint

- **IMPLEMENT**: Basic rate limiting for chat API
- **PATTERN**: In-memory rate limiter (good enough for MVP)
- **GOTCHA**: Will need proper rate limiting in production (Redis-backed)
- **VALIDATE**: Rapid requests get 429 response

Add to backend/app/api/chat.py:
```python
from collections import defaultdict
from datetime import datetime, timedelta

# Simple in-memory rate limiter
request_counts = defaultdict(list)
RATE_LIMIT = 20  # requests per minute


def check_rate_limit(client_ip: str) -> bool:
    """Check if client has exceeded rate limit."""
    now = datetime.now()
    minute_ago = now - timedelta(minutes=1)

    # Clean old requests
    request_counts[client_ip] = [
        t for t in request_counts[client_ip] if t > minute_ago
    ]

    # Check limit
    if len(request_counts[client_ip]) >= RATE_LIMIT:
        return False

    request_counts[client_ip].append(now)
    return True


@router.post("/chat")
async def chat(request: ChatRequest, client_request: Request):
    """Stream chat response from Claude."""
    client_ip = client_request.client.host

    if not check_rate_limit(client_ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded")

    return EventSourceResponse(...)
```

#### 4.6 UPDATE CLAUDE.md with new commands

- **IMPLEMENT**: Add backend commands to CLAUDE.md
- **VALIDATE**: File updated

Add to CLAUDE.md:
```markdown
## Backend Commands

```bash
cd backend
pip install -e .              # Install dependencies
uvicorn app.main:app --reload # Start dev server on port 8000
pytest                        # Run backend tests
```

## Full Stack Development

```bash
# Terminal 1: Backend
cd backend && uvicorn app.main:app --reload --port 8000

# Terminal 2: Frontend
cd frontend && npm run dev
```

Frontend dev server proxies /api/* requests to backend.
```

---

## TESTING STRATEGY

### Unit Tests

**Backend (pytest):**
- Test chat endpoint accepts valid requests
- Test contact endpoint validates input
- Test rate limiting logic
- Test system prompt building

**Frontend (vitest):**
- Test AIChat component renders
- Test ContactForm validation
- Test profile data structure

### Integration Tests

- Full chat flow: frontend → backend → Claude → streaming response
- Contact form submission and response
- Error handling when backend unavailable (fallback to demo responses)

### Edge Cases

- [ ] Empty message submission (should be prevented)
- [ ] Very long messages (backend should handle gracefully)
- [ ] Rapid-fire requests (rate limiting works)
- [ ] Network disconnection during streaming (error handling)
- [ ] Invalid JSON in SSE events (graceful degradation)
- [ ] Backend unavailable (frontend falls back to demo responses)

---

## VALIDATION COMMANDS

Execute every command to ensure zero regressions and 100% feature correctness.

### Level 1: Syntax & Style

```bash
# Frontend
cd frontend
npm run lint
npx tsc --noEmit

# Backend
cd backend
python -m py_compile app/main.py app/core/config.py app/api/chat.py app/api/contact.py
```

### Level 2: Unit Tests

```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
pip install -e ".[dev]"
pytest
```

### Level 3: Build Tests

```bash
# Frontend build
cd frontend
npm run build

# Docker build
docker build -t ai-resume .
```

### Level 4: Manual Validation

```bash
# Start backend
cd backend
uvicorn app.main:app --reload --port 8000

# In another terminal, start frontend
cd frontend
npm run dev

# Test endpoints
curl http://localhost:8000/health
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com"}'

# Test streaming chat (watch for SSE events)
curl -N -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What experience do you have?", "profile_context": "Staff engineer"}'
```

### Level 5: Browser Testing

- [ ] Open http://localhost:8080 in Chrome
- [ ] Click "Ask AI" button - chat modal opens
- [ ] Type a question - response streams in real-time
- [ ] Scroll down to contact form - form is visible
- [ ] Submit contact form - success message appears
- [ ] Test on mobile viewport (Chrome DevTools)
- [ ] Verify all navigation links work

---

## ACCEPTANCE CRITERIA

- [ ] Project restructured into frontend/ and backend/ directories
- [ ] Backend starts with `uvicorn app.main:app` without errors
- [ ] Frontend starts with `npm run dev` without errors
- [ ] Chat API returns streaming SSE responses from Claude
- [ ] Chat UI displays streaming tokens in real-time
- [ ] Contact form submits successfully with validation
- [ ] Rate limiting prevents rapid requests (429 response)
- [ ] Docker build succeeds for full application
- [ ] All lint checks pass
- [ ] All unit tests pass
- [ ] Mobile layout works (no horizontal scroll)
- [ ] Falls back to demo responses when backend unavailable

---

## COMPLETION CHECKLIST

- [ ] Phase 1: Project restructured, frontend builds from frontend/
- [ ] Phase 2: Backend runs, health endpoint works, chat streams
- [ ] Phase 3: Frontend connects to backend, real AI responses work
- [ ] Phase 4: Docker builds, deployment config complete
- [ ] All validation commands executed successfully
- [ ] Manual browser testing complete
- [ ] Code follows existing patterns

---

## NOTES

### Design Decisions

1. **Single service deployment**: FastAPI serves static frontend in production rather than separate frontend/backend services. Simpler to deploy and manage.

2. **SSE over WebSockets**: Chat only needs server→client streaming. SSE is simpler, works over HTTP, and has better proxy support.

3. **In-memory rate limiting**: Good enough for MVP. Can upgrade to Redis-backed for scale.

4. **Profile context in request**: Frontend sends full profile context with each request. Keeps backend stateless and allows future multi-profile support.

5. **Fallback to demo responses**: If backend fails, frontend falls back to keyword-matching demo responses for graceful degradation.

### Trade-offs

- **No conversation persistence**: Conversations are session-only. Adding persistence would require database and significantly increase complexity.

- **API key in backend only**: Frontend never has access to Anthropic API key. All AI calls go through backend.

- **Simple email logging**: Contact form logs rather than emails for MVP. Real email service integration is straightforward to add later.

### Future Improvements

1. Add actual Joseph Fajen profile content (Phase 5 in PRD)
2. Implement real email delivery for contact form
3. Add conversation analytics
4. Custom domain setup on Railway
5. Add Prometheus metrics for monitoring
