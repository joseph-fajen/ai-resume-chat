# Feature: Phase 2 Content Enrichment & Accuracy

## Feature Description

Enrich the AI resume chat's content layer and fix accuracy violations. No architecture changes — just richer, more accurate content flowing to Claude via the existing data file, system prompt, and profile context builder.

## User Story

As a recruiter/hiring manager evaluating Joseph,
I want the AI to give accurate, narrative-rich, contextually appropriate answers,
So that I can trust the information and understand Joseph's approach beyond bullet points.

## Problem Statement

The AI currently has accuracy violations (says "production" for a test deployment, implies sole authorship of collaborative work) and lacks narrative depth (no story-based framing, no education context, no emphasis angles for different question types).

## Solution Statement

Fix all accuracy violations in `joseph-fajen.ts`, `agent.py`, and demo responses. Add `narratives`, `contentGuidelines`, and `emphasisAngles` fields to the profile data. Update `buildProfileContext()` to include new content. Update system prompt to reference accuracy constraints and remove hardcoded content that duplicates the data layer.

## Feature Metadata

- **Type**: Enhancement
- **Complexity**: Medium
- **Files to modify**: 3 (`joseph-fajen.ts`, `agent.py`, `AIChat.tsx`)
- **Dependencies**: None (content from resume repo is read manually and pasted)

---

## CONTEXT REFERENCES

### Files to Modify

1. **`frontend/src/data/joseph-fajen.ts`** — Fix accuracy violations, add `narratives`, `contentGuidelines`, `emphasisAngles` fields
2. **`backend/app/core/agent.py`** — Fix "shipped production" language, add accuracy constraints section, remove hardcoded differentiators that duplicate data layer
3. **`frontend/src/components/AIChat.tsx`** (lines 25-69) — Update `buildProfileContext()` to serialize new fields

### Source Content (read-only, copy from)

- `/Users/josephfajen/git/resume/source/resume.md` — Narratives (Uncle's Garage, AI Assistant story, ChatDoc story, education, earlier career)
- `/Users/josephfajen/git/resume/RESUME-NOTES.md` — Accuracy rules (canonical)
- `/Users/josephfajen/git/resume/LinkedIn-About-Section-Jan-2026.md` — Alternative summary
- `frontend/src/data/resume/draft-cover-letter.md` — W&B/ML emphasis angle
- `frontend/src/data/resume/cover-letter-midnight-draft.md` — Verification emphasis angle

---

## STEP-BY-STEP TASKS

### Task 1: UPDATE `joseph-fajen.ts` — Fix accuracy violations

Fix these specific lines:

- **Line 20** (`summary`): Change "shipped a production AI chatbot solo" → "built and deployed a full-stack AI chatbot solo"
- **Line 36** (`featuredProjects[0].why`): Change "shipping production content" → "shipping content" (remove "production" framing)
- **Line 41** (`featuredProjects[1].description`): Change "Production AI chatbot" → "AI chatbot for blockchain documentation"
- **Line 47** (`featuredProjects[1].highlights[4]`): Change "Deployed on Railway infrastructure, currently in production" → "Deployed on Railway infrastructure as test deployment"
- **Line 50** (`featuredProjects[1].why`): Change "shipped a production AI application" → "built and deployed a full-stack AI application"
- **Line 76** (`experience[0].highlights[2]`): Change "Essential Cardano AI Assistant (production chatbot)" → "Essential Cardano AI Assistant (full-stack chatbot)"
- **Line 84** (`experience[0].aiContext.technicalWork`): Change "Built production AI chatbot" → "Built full-stack AI chatbot"

- **VALIDATE**: `cd frontend && npm run build`

### Task 2: UPDATE `joseph-fajen.ts` — Fix demo response accuracy

In `demoResponses`:

- **`default`** (line ~171): Change "a production chatbot processing 2,500 documents" → "a full-stack chatbot processing 2,500 documents"
- **`aiProject`** (line ~204): Remove "production-ready" or change to "deployed" — change "Deployed on Railway infrastructure — 91 commits, full project lifecycle" (keep as-is, this is fine). Check for any "production" references.
- **`technicalDepth`** (line ~232): Change "He built a production AI chatbot from scratch" → "He built a full-stack AI chatbot from scratch"
- **`fitAssessments.strong.matches`** (line ~296): Change "Built production AI chatbot solo" → "Built full-stack AI chatbot solo"
- **`fitAssessments.weak.mismatches`** (line ~309): Change "shipped an AI chatbot" → "built an AI chatbot"

- **VALIDATE**: `cd frontend && npm run build`

### Task 3: UPDATE `joseph-fajen.ts` — Add new fields

Add these 3 new fields to `josephProfile` (after `failures` array, before closing brace):

```typescript
  // Narrative content for richer AI responses
  narratives: {
    marloweTransformation: "The 'Uncle's Garage' Transformation: Cardano's Marlowe smart contract platform had documentation scattered across multiple repositories — like walking into an uncle's garage where valuable tools are buried under years of accumulated chaos. I took sole ownership of the documentation transformation. Over 13 months, I authored 17,900+ lines across 124 files, accounting for 78% of all commits. I designed an information architecture with 5 distinct user personas and visual pathway diagrams, documented a 91-schema OpenAPI specification for the 7-service runtime architecture, and established weekly engineering syncs that resulted in 59 merged PRs. The result: a unified, authoritative documentation site built with a pre-adoption strategy — comprehensive docs ready for users who don't exist yet.",
    aiAssistantStory: "When Documentation Needed AI: The Cardano ecosystem spans thousands of documents across dozens of sources. Users needed instant, accurate answers — but any AI assistant in this space risked hallucination, which in blockchain could mean real financial consequences. I built a full-stack AI chatbot end-to-end, solo. I ingested 2,500 documents from 8 sources, iterated through 20+ system prompt versions until achieving zero detectable hallucination, and deployed a Next.js web UI with streaming and conversation persistence. 91 commits from concept to deployment.",
    chatdocStory: "Building Tools When Documentation Requires It: Community questions on Discord often revealed documentation gaps, but there was no systematic way to identify patterns. I built ChatDoc-InsightMiner-PromptLab — a toolkit that analyzes community conversations, identifies recurring questions, and derives documentation from real user needs. I created a multi-LLM comparison framework testing OpenAI, Anthropic, and Gemini APIs. Result: 25+ FAQ entries derived from Discord analysis, plus a reusable methodology for community-sourced documentation.",
    educationPhilosophy: "B.A., History and Philosophy — U.C. Davis, 1989. The philosophy taught me to question assumptions. The history taught me that context matters. Both inform how I approach documentation — always asking 'why?' and 'for whom?'",
    earlierCareer: "15 years building documentation expertise (2001-2015): From HP consulting to startup API documentation to transforming a college's static website into a dynamic database-driven platform — each role added another dimension to my understanding of how documentation serves users. At AJA Video Systems (2016-2022), I created the company's first comprehensive REST API documentation and documented complex multi-channel video systems and HD/4K conversion gateways.",
    linkedInSummary: "I've learned that I do my best work when I own a documentation project completely — not just the writing, but the architecture, tooling, and delivery. Over 20+ years, I've discovered that great technical documentation isn't about clear prose alone. It's about designing user journeys that guide people from confusion to clarity, building information architecture around how different personas actually learn, and creating tools when standard approaches fall short."
  },

  // Accuracy constraints — injected into system prompt
  contentGuidelines: {
    identity: "Technical Writer Who Builds Tools (not 'Who Ships Code')",
    framingPreference: "I'm a technical writer who develops (not 'developer who writes')",
    accuracyRules: [
      "Essential Cardano AI Assistant was deployed to a test environment for testing and evaluation — never publicly released. Say 'built and deployed' or 'test deployment', NOT 'shipped production' or 'production deployment'.",
      "Marlowe tutorials and Starter Kit: COLLABORATED with Knowledge Engineer and Software Developer to integrate 41 tutorial pages. Do NOT say 'Built' or 'Created' the tutorials (implies sole authorship).",
      "OpenAPI specification: Worked closely with software developer to integrate the 91-schema spec. Do NOT say 'Created' or 'Authored' the spec.",
      "Identity: 'Technical Writer Who Builds Tools' — not 'Who Ships Code'. 'Technical writer who develops' — not 'developer who writes'."
    ]
  },

  // Emphasis angles for different question types
  emphasisAngles: {
    ownership: "Documentation strategist who owns the full lifecycle — architecture, content, tooling, and delivery. Sole owner of Marlowe docs for 13 months, 78% of all commits.",
    builder: "Technical writer who builds tools and ships software when documentation challenges require it. Built two documentation tools at IOHK: AI chatbot and ChatDoc analysis toolkit.",
    apiDeveloper: "API and developer documentation specialist. Documented 91-schema OpenAPI spec, 7-service microservices architecture, REST APIs. Created first comprehensive API docs at AJA Video Systems.",
    mlTooling: "Hands-on with Python, LLMs, and vector databases. Built chatbot with Claude API, created multi-LLM comparison framework (OpenAI, Anthropic, Gemini). One substantial AI project — not years of ML engineering. Honest about scope.",
    verification: "Establishes verification processes, works hands-on in development environments. Every code example compiles before inclusion. Accuracy has security implications in blockchain documentation."
  },
```

- **VALIDATE**: `cd frontend && npm run build`

### Task 4: UPDATE `AIChat.tsx` — Expand `buildProfileContext()`

Add new sections to the `buildProfileContext()` return string (after DOCUMENTED FAILURES, before closing backtick):

```typescript
NARRATIVES (use these for richer, story-based answers):
${Object.entries(josephProfile.narratives).map(([key, value]) => `- ${key}: ${value}`).join("\n")}

CONTENT ACCURACY RULES (NEVER violate these):
${josephProfile.contentGuidelines.accuracyRules.map(rule => `- ${rule}`).join("\n")}
Identity: ${josephProfile.contentGuidelines.identity}
Framing: ${josephProfile.contentGuidelines.framingPreference}

EMPHASIS ANGLES (adapt based on question type):
${Object.entries(josephProfile.emphasisAngles).map(([angle, desc]) => `- ${angle}: ${desc}`).join("\n")}
```

- **VALIDATE**: `cd frontend && npm run build`

### Task 5: UPDATE `agent.py` — Fix accuracy and restructure system prompt

Changes to `SYSTEM_PROMPT`:

1. **Line 16**: Change "Shipped a production AI chatbot solo" → "Built and deployed a full-stack AI chatbot solo"
2. **Line 24**: Change "he's a technical writer who ships software" → "he's a technical writer who builds tools"
3. **Line 45**: Change "He builds production software" → "He builds software"
4. **Add accuracy constraints section** after CORE INSTRUCTIONS block:

```python
CONTENT ACCURACY RULES (NEVER violate these — these come from the profile data):
The profile context below includes explicit accuracy rules. Follow them strictly.
When discussing the Essential Cardano AI Assistant, say "built and deployed" or "test deployment" — NEVER "shipped production" or "production deployment".
When discussing Marlowe tutorials, say "collaborated" — NEVER imply sole authorship.
When discussing the OpenAPI spec, say "integrated collaboratively" — NEVER "created" or "authored".
Joseph's identity: "Technical Writer Who Builds Tools" — not "Who Ships Code".

EMPHASIS ADAPTATION:
The profile context includes multiple emphasis angles (ownership, builder, API, ML, verification).
Choose the angle that best fits the question being asked. If someone asks about API work, lean on the API angle. If about leadership, lean on ownership. Always respect accuracy constraints.
```

5. **Remove hardcoded differentiators** that now live in the data layer. The DIFFERENTIATORS section should reference the profile context rather than duplicating specific claims. Simplify to behavioral instructions:

```python
JOSEPH'S DIFFERENTIATORS (the profile context has specific details — reference those):
- He builds things: when documentation challenges require systematic solutions, he builds tools. Reference his specific projects from the profile context.
- Technical depth: reads codebases, writes Python and JavaScript, works as a peer with engineers.
- Strategic thinker: sees documentation as a product with information architecture, not just pages.
- Documentation leader: has owned strategy, led migrations, made architectural decisions. Ready for lead/senior IC roles.
```

- **VALIDATE**: `cd backend && python -c "from app.core.agent import SYSTEM_PROMPT; print('OK')"` (syntax check)

---

## VALIDATION COMMANDS

### Level 1: Build & Lint
```bash
cd frontend && npm run build
cd frontend && npm run lint
cd backend && python -c "from app.core.agent import SYSTEM_PROMPT, build_system_prompt; print(build_system_prompt('test')[:200])"
```

### Level 2: Tests
```bash
cd frontend && npm test
```

### Level 3: Manual Validation
1. Start backend: `cd backend && uvicorn app.main:app --reload --port 8000`
2. Start frontend: `cd frontend && npm run dev`
3. Test these questions in chat:
   - "Tell me about the AI chatbot you built" → should NOT say "production"
   - "Did you create the Marlowe tutorials?" → should say "collaborated"
   - "How do you approach a documentation project?" → should use narrative framing
   - "Are you technical enough for an ML team?" → honest scoping with ML angle

---

## ACCEPTANCE CRITERIA

- [ ] All accuracy violations from PRD Section 6.1 are fixed
- [ ] `contentGuidelines` field exists with accuracy rules
- [ ] `narratives` field exists with story content from resume repo
- [ ] `emphasisAngles` field exists with 5 angles
- [ ] `buildProfileContext()` serializes all new fields
- [ ] System prompt references accuracy constraints
- [ ] System prompt no longer hardcodes claims that duplicate data layer
- [ ] Demo responses use accurate language (no "production" for Essential Cardano)
- [ ] `npm run build` passes
- [ ] `npm test` passes
- [ ] `npm run lint` passes
