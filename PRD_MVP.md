# Product Requirements Document: AI-Powered Interactive Resume

## 1. Executive Summary

This project transforms a demo interactive resume into a personalized, AI-powered professional portfolio for Joseph Fajen. Unlike traditional static resumes that receive a 10-second glance, this tool creates an engaging 5-minute conversation where recruiters, hiring managers, and technical interviewers can ask questions and receive thoughtful, contextual responses about skills, experience, and professional fit.

The core innovation is replacing the demo's keyword-matching responses with a real AI backend powered by Anthropic Claude, enabling natural conversation while maintaining strict professional boundaries. The system will honestly represent Joseph's background, acknowledge gaps, and help evaluators quickly determine mutual fit.

**MVP Goal:** Deploy a production-ready AI resume on Railway that serves both the interactive frontend and AI chat backend as a single service, with mobile-responsive design and professional guardrails.

## 2. Mission

**Mission Statement:** Enable meaningful, efficient conversations between Joseph and potential employers by providing an AI-powered interface that honestly represents his professional background and helps both parties quickly evaluate fit.

**Core Principles:**
1. **Honesty over salesmanship** — Acknowledge gaps and failures; never oversell
2. **Respect boundaries** — Professional topics only; deflect personal, political, or salary questions
3. **Substance over fluff** — Specific examples and evidence, not generic claims
4. **Efficiency** — Help evaluators get answers faster than reading a traditional resume
5. **Mobile-first** — Equal experience on phone and desktop

## 3. Target Users

**Primary Personas:**

| Persona | Context | Needs |
|---------|---------|-------|
| **Recruiter** | Screening candidates, often on mobile between meetings | Quick assessment of fit, key highlights, easy contact method |
| **Hiring Manager** | Evaluating technical depth and team fit | Specific project details, leadership style, honest self-assessment |
| **Technical Interviewer** | Preparing interview questions | Deep technical context, interesting areas to probe, failure stories |

**Technical Comfort Level:** High — these users interact with professional tools daily and expect polished, responsive interfaces.

**Key Pain Points Addressed:**
- Resumes are static and don't answer follow-up questions
- Phone screens are time-consuming for basic fact-finding
- Hard to assess self-awareness and honesty from traditional materials

## 4. MVP Scope

### In Scope

**Core Functionality:**
- ✅ Interactive AI chat with real Anthropic Claude integration
- ✅ Streaming responses for natural conversation feel
- ✅ Profile data display (hero, experience, skills)
- ✅ Fit Assessment feature (strong fit / weak fit criteria)
- ✅ Suggested questions to guide conversation
- ✅ Contact form (name, email, message, optional company/role)
- ✅ LinkedIn and GitHub links (header + footer)
- ✅ Status badge (placeholder text, easily configurable)

**Technical:**
- ✅ FastAPI backend with chat endpoint
- ✅ Vite/React frontend (existing, adapted)
- ✅ Single-service deployment (FastAPI serves static frontend)
- ✅ Mobile-responsive design
- ✅ Stateless conversations (no database)
- ✅ Environment-based configuration

**Deployment:**
- ✅ Railway deployment as single service
- ✅ Docker containerization
- ✅ HTTPS via Railway

### Out of Scope

**Deferred Features:**
- ❌ Conversation history persistence
- ❌ Analytics/tracking of conversations
- ❌ Multiple profile support
- ❌ Resume PDF download generation
- ❌ Calendar/scheduling integration
- ❌ Custom domain (can add later)
- ❌ Photo/avatar
- ❌ Dark mode toggle (keep default theme)

## 5. User Stories

**Primary User Stories:**

1. **As a recruiter**, I want to ask quick questions about a candidate's background, so that I can determine fit without scheduling a call.
   - *Example: "Does this person have experience with distributed systems?"*

2. **As a hiring manager**, I want to understand how a candidate handled specific challenges, so that I can assess their problem-solving approach.
   - *Example: "Tell me about a project that failed and what you learned."*

3. **As a technical interviewer**, I want to explore depth in specific areas, so that I can prepare relevant interview questions.
   - *Example: "What was the most complex API design decision you made at your previous role?"*

4. **As any evaluator**, I want honest answers including acknowledged gaps, so that I can trust the information I'm receiving.
   - *Example: "Do you have experience with mobile development?" → Honest "no" with context*

5. **As a mobile user**, I want to have a conversation while commuting, so that I can evaluate candidates efficiently.
   - *Example: Full chat functionality on iPhone screen*

6. **As an interested evaluator**, I want to easily contact Joseph, so that I can move forward with the hiring process.
   - *Example: Submit contact form, Joseph receives email notification*

7. **As an evaluator**, I want to see a quick fit assessment, so that I can understand where this candidate would excel or struggle.
   - *Example: View "Strong Fit" criteria with evidence from experience*

## 6. Core Architecture & Patterns

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Railway Service                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │                 FastAPI Backend                    │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │  │
│  │  │ /api/chat   │  │ /api/contact│  │ Static    │  │  │
│  │  │ (streaming) │  │ (email)     │  │ Files     │  │  │
│  │  └──────┬──────┘  └─────────────┘  └───────────┘  │  │
│  │         │                              ↑          │  │
│  │         ▼                              │          │  │
│  │  ┌─────────────┐               ┌───────┴───────┐  │  │
│  │  │ Anthropic   │               │ Built Vite    │  │  │
│  │  │ Claude API  │               │ Frontend      │  │  │
│  │  └─────────────┘               └───────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Directory Structure

```
ai-resume/
├── frontend/                 # Vite/React app (moved from root)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChat.tsx   # Updated to call real API
│   │   │   ├── ContactForm.tsx  # New component
│   │   │   └── ...
│   │   ├── data/
│   │   │   └── joseph-fajen.ts  # Profile data
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # FastAPI service
│   ├── app/
│   │   ├── main.py          # FastAPI entry, static file serving
│   │   ├── core/
│   │   │   ├── config.py    # Settings, API keys
│   │   │   └── agent.py     # Claude agent setup
│   │   └── api/
│   │       ├── chat.py      # Chat endpoint
│   │       └── contact.py   # Contact form endpoint
│   ├── pyproject.toml
│   └── Dockerfile
├── docker-compose.yml        # Local development
└── README.md
```

### Key Design Patterns

**From obsidian-ai-agent (simplified):**
- **Settings singleton** — pydantic-settings with environment override
- **Agent factory** — System prompt + model configuration
- **Streaming responses** — SSE for real-time token delivery
- **Structured logging** — Request tracking for debugging

**Frontend patterns (existing):**
- **Data-driven UI** — Profile data in single source file
- **Component composition** — Page assembled from focused components
- **Tailwind theming** — CSS variables for consistent styling

## 7. Features

### 7.1 AI Chat

**Purpose:** Enable natural conversation about professional background

**Key Features:**
- Real-time streaming responses (tokens appear as generated)
- Conversation context maintained within session
- Suggested questions for guidance
- Professional boundary enforcement
- Graceful error handling

**Behavior Specifications:**
- Deflect off-topic questions (personal, political, salary)
- Acknowledge gaps honestly ("I don't have mobile development experience")
- Provide specific examples from experience data
- Reference documented failures when relevant

### 7.2 Contact Form

**Purpose:** Convert interest into outreach

**Fields:**
- Name (required)
- Email (required)
- Company/Role (optional)
- Message (optional)

**Backend:** Send notification email to Joseph via SMTP or email service (SendGrid/Resend)

### 7.3 Fit Assessment

**Purpose:** Help evaluators quickly understand where Joseph excels or may not fit

**Implementation:**
- Display "Strong Fit" indicators with evidence
- Display "Potential Gaps" with honest assessment
- Criteria defined in profile data (content creation phase)

### 7.4 Profile Display

**Purpose:** Visual presentation of background (non-AI sections)

**Sections:**
- Hero (name, title, status badge, CTA)
- Experience cards with highlights
- Skills categorization (strong, moderate, gaps)
- LinkedIn/GitHub links (header + footer)

## 8. Technology Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.12+ | Runtime |
| FastAPI | Latest | API framework |
| Pydantic | v2 | Settings, validation |
| Anthropic SDK | Latest | Claude API client |
| uvicorn | Latest | ASGI server |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| shadcn/ui | - | Component primitives |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Railway | Deployment platform |

### Third-Party Integrations

| Service | Purpose |
|---------|---------|
| Anthropic Claude | AI responses |
| SendGrid/Resend (TBD) | Contact form emails |

## 9. Security & Configuration

### Environment Variables

```bash
# Required
ANTHROPIC_API_KEY=sk-ant-...

# Email service (TBD)
EMAIL_SERVICE_API_KEY=...
NOTIFICATION_EMAIL=joseph@example.com

# Optional
LOG_LEVEL=INFO
ENVIRONMENT=production
```

### Security Considerations

**In Scope:**
- ✅ API key protection (environment variables, never in frontend)
- ✅ Input sanitization on contact form
- ✅ Rate limiting on chat endpoint (prevent abuse)
- ✅ HTTPS enforcement (Railway provides)
- ✅ System prompt guardrails against jailbreaking

**Out of Scope:**
- ❌ User authentication (public site)
- ❌ Data encryption at rest (no database)
- ❌ GDPR compliance features (no personal data stored)

### AI Guardrails

The system prompt must include:
- Explicit instruction to only discuss professional topics
- Deflection language for off-topic questions
- Prohibition on salary/compensation discussion
- Instruction to never claim capabilities not documented in profile
- Handling of adversarial/jailbreak attempts

## 10. API Specification

### POST /api/chat

**Purpose:** Send message, receive streaming AI response

**Request:**
```json
{
  "message": "Tell me about your API design experience",
  "conversation_history": [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."}
  ],
  "profile_context": {
    "name": "Joseph Fajen",
    "experiences": [...],
    "skills": {...},
    "failures": [...],
    "systemPrompt": "..."
  }
}
```

**Response:** Server-Sent Events (SSE) stream
```
data: {"type": "token", "content": "Based"}
data: {"type": "token", "content": " on"}
data: {"type": "token", "content": " my"}
...
data: {"type": "done"}
```

### POST /api/contact

**Purpose:** Submit contact form

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "company": "Acme Corp",
  "role": "Engineering Manager",
  "message": "Would love to chat about our platform team opening"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! Joseph will be in touch soon."
}
```

### GET /health

**Purpose:** Health check for Railway

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

## 11. Success Criteria

### MVP Success Definition

The MVP is successful when:
1. A recruiter can have a meaningful 5-minute conversation on mobile
2. The AI provides specific, honest answers grounded in real experience
3. Off-topic questions are gracefully deflected
4. Contact form successfully delivers notifications
5. Site loads quickly and works on all modern browsers

### Functional Requirements

- ✅ Chat responds within 2 seconds (first token)
- ✅ Mobile layout fully functional (no horizontal scroll, readable text)
- ✅ All profile sections render correctly
- ✅ Contact form submissions trigger email notification
- ✅ LinkedIn/GitHub links work and open in new tab
- ✅ Fit Assessment displays with accurate criteria

### Quality Indicators

- Chat feels natural (streaming, not waiting for full response)
- AI stays on-topic 100% of the time
- No crashes or unhandled errors visible to users
- Page loads in under 3 seconds

### User Experience Goals

- First-time visitor understands purpose within 10 seconds
- Can start chatting within 2 clicks
- Can contact Joseph within 3 clicks
- Mobile experience indistinguishable from desktop in functionality

## 12. Implementation Phases

### Phase 1: Project Restructure

**Goal:** Reorganize into monorepo structure

**Deliverables:**
- ✅ Create `frontend/` and `backend/` directories
- ✅ Move existing Vite app to `frontend/`
- ✅ Update paths in configs (vite.config.ts, tsconfig.json)
- ✅ Verify frontend still builds and runs

**Validation:** `npm run dev` works from `frontend/` directory

### Phase 2: Backend Foundation

**Goal:** Minimal FastAPI backend with Claude integration

**Deliverables:**
- ✅ Bootstrap FastAPI app structure (adapted from obsidian-ai-agent)
- ✅ Implement `/api/chat` endpoint with streaming
- ✅ Implement `/health` endpoint
- ✅ Configure Anthropic Claude integration
- ✅ Add system prompt with professional guardrails
- ✅ Create Dockerfile

**Validation:** Can send chat request via curl/Postman and receive streamed response

### Phase 3: Frontend Integration

**Goal:** Connect frontend to real backend

**Deliverables:**
- ✅ Update `AIChat.tsx` to call `/api/chat`
- ✅ Implement streaming response handling
- ✅ Add contact form component
- ✅ Add LinkedIn/GitHub links to header/footer
- ✅ Rename profile to `joseph-fajen.ts` (placeholder content)
- ✅ Configure Vite proxy for local development

**Validation:** Full chat flow works locally (frontend → backend → Claude → streaming response)

### Phase 4: Deployment & Polish

**Goal:** Production deployment on Railway

**Deliverables:**
- ✅ Configure FastAPI to serve built frontend
- ✅ Set up Railway service
- ✅ Configure environment variables
- ✅ Implement contact form email delivery
- ✅ Add rate limiting
- ✅ Test mobile responsiveness
- ✅ Final testing of all flows

**Validation:** Live URL works on mobile and desktop, contact form delivers email

### Phase 5: Content Creation (Ongoing)

**Goal:** Replace placeholder content with real profile

**Deliverables:**
- ✅ Write Joseph's profile data (experiences, aiContext, skills)
- ✅ Document failures honestly
- ✅ Define fit assessment criteria
- ✅ Craft suggested questions
- ✅ Refine system prompt
- ✅ Determine status badge text

**Validation:** Real conversations feel authentic and useful

## 13. Future Considerations

**Post-MVP Enhancements:**
- Conversation analytics (what questions are asked most?)
- Resume PDF generation from profile data
- Calendar integration for scheduling calls
- Custom domain
- Dark mode toggle
- A/B testing different suggested questions

**Integration Opportunities:**
- LinkedIn API for verified credentials
- GitHub API for live repo statistics
- Calendly/Cal.com for scheduling

**Advanced Features:**
- Voice input/output
- Multi-language support
- Personalized responses based on visitor's company (if provided)

## 14. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **AI says something inaccurate** | High — damages credibility | Strict system prompt, test extensively, include disclaimer |
| **Jailbreak attempts** | Medium — embarrassment | Guardrails in system prompt, test adversarial prompts |
| **API costs spiral** | Medium — unexpected expense | Rate limiting, monitor usage, set budget alerts |
| **Mobile layout breaks** | High — primary use case | Test on real devices, use responsive design patterns |
| **Contact form spam** | Low — annoyance | Basic validation, consider honeypot field, rate limit |

## 15. Appendix

### Related Resources

- **Demo codebase:** `/Users/josephfajen/git/ai-resume-chat`
- **Pattern reference:** `/Users/josephfajen/git/obsidian-ai-agent`
- **Anthropic Claude docs:** https://docs.anthropic.com
- **Railway docs:** https://docs.railway.app

### Key Files Reference

| File | Purpose |
|------|---------|
| `frontend/src/data/joseph-fajen.ts` | Profile data (single source of truth) |
| `frontend/src/components/AIChat.tsx` | Chat UI (update for real API) |
| `backend/app/core/agent.py` | Claude agent configuration |
| `backend/app/api/chat.py` | Chat endpoint |
| `backend/Dockerfile` | Container build |

### Content Creation Template

When creating `joseph-fajen.ts`, follow this structure for each experience:

```typescript
{
  company: "Company Name",
  role: "Your Title",
  period: "2020–2024",
  highlights: [
    "Displayed in UI - keep brief",
    "Quantify where possible"
  ],
  aiContext: {
    situation: "What was the challenge or context?",
    approach: "How did you tackle it?",
    technicalWork: "Specific technical details",
    lessonsLearned: "Retrospective insight"
  }
}
```
