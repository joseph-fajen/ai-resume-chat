# Product Requirements Document: Content Enrichment & Accuracy

**Phase 2** — Successor to [PRD_MVP.md](PRD_MVP.md), which covered initial build (Phases 1–5, all complete).

## 1. Executive Summary

The AI resume chat MVP is deployed and functional. The next evolution is making the AI *smarter* — not by changing the model or architecture, but by giving it richer, more accurate content to draw from.

Joseph's `/git/resume` repo contains a sophisticated content system: a master narrative resume, 9 content variations across 3 emphasis axes, 4 job-specific applications with fit analyses, and critically, accuracy guardrails documenting what the AI can and cannot claim. None of this content currently flows into the AI chat.

This phase enriches the AI's content layer in three progressive approaches:
1. **Approach 1 (immediate):** Merge the richest content from all sources into the existing single data file. Fix accuracy violations. Inject content guardrails into the system prompt.
2. **Approach 2 (next iteration):** Separate facts from narratives from audience-specific framing. Enable Claude to naturally select emphasis based on the question being asked.
3. **Approach 3 (future, if warranted):** Add job-aware dynamic mode where the AI adapts its framing based on the evaluator's stated role/company.

**Phase 2 Goal:** An AI that gives more specific, more accurate, and more compelling answers — drawing from the full depth of Joseph's content ecosystem rather than a single static snapshot.

## 2. Mission

**Mission Statement:** Same as Phase 1 — enable meaningful, efficient conversations between Joseph and potential employers through honest, specific AI responses. Phase 2 deepens the *honest* and *specific* parts.

**Core Principles (unchanged + additions):**
1. **Honesty over salesmanship** — Acknowledge gaps and failures; never oversell
2. **Respect boundaries** — Professional topics only; deflect personal, political, or salary questions
3. **Substance over fluff** — Specific examples and evidence, not generic claims
4. **Efficiency** — Help evaluators get answers faster than reading a traditional resume
5. **Mobile-first** — Equal experience on phone and desktop
6. **NEW: Accuracy as a first-class constraint** — The AI must never overclaim. Specific accuracy rules are codified and enforced, not left to prompt engineering intuition
7. **NEW: Content richness over feature breadth** — Better answers from richer content beats new UI features

## 3. Target Users

Unchanged from Phase 1. The same three personas (Recruiter, Hiring Manager, Technical Interviewer) benefit from richer, more accurate AI responses. No new user types are introduced.

The key insight from the recruiter perspective: **recruiters are professional skeptics.** The moment they catch an overclaim, they discount everything else. Accuracy guardrails are the highest-value content to integrate — more valuable than any clever architecture.

## 4. Phase 2 Scope

### In Scope

**Content Enrichment (Approach 1):**
- ✅ Merge narrative content from `resume/source/resume.md` into `joseph-fajen.ts` (story-based framing, education philosophy, earlier career detail)
- ✅ Fix accuracy violations flagged in `RESUME-NOTES.md` (see Section 6.1)
- ✅ Add `contentGuidelines` field to profile data, injected into system prompt
- ✅ Add LinkedIn About section content as alternative summary material
- ✅ Enrich `aiContext` with cover letter angles (verification emphasis from Midnight, ML emphasis from W&B)
- ✅ Add 15-year earlier career narrative from `source/resume.md`
- ✅ Update system prompt (`agent.py`) to reference accuracy constraints and remove hardcoded inaccuracies
- ✅ Sync system prompt differentiators with actual data layer content

**Content Architecture (Approach 2 — design only):**
- ✅ Design separation of facts, narratives, and audience-specific framing
- ✅ Define TypeScript interfaces for the multi-layer content model
- ✅ Plan migration path from monolithic `joseph-fajen.ts` to structured content layer

### Out of Scope (Deferred)

**Approach 3 — Job-Aware Dynamic Mode:**
- ❌ UI context-setter for visitors to describe their role/company
- ❌ Dynamic system prompt adaptation based on evaluator context
- ❌ Import of job-specific fit analyses from resume repo

**Other Deferred Features (from Phase 1):**
- ❌ Conversation history persistence
- ❌ Analytics/tracking
- ❌ Resume PDF download
- ❌ Calendar integration
- ❌ Custom domain
- ❌ Dark mode

## 5. User Stories

Phase 2 doesn't change user-facing behavior — it makes existing behavior better. These stories capture the quality improvements:

1. **As a recruiter**, I want the AI to give accurate claims about the candidate's experience, so that I can trust the information without fact-checking.
   - *Example: AI says "built and deployed a full-stack Next.js web application" instead of "shipped production application" for the Essential Cardano project*

2. **As a hiring manager**, I want the AI to draw from narrative stories, not just bullet points, so that I understand the candidate's approach and thinking.
   - *Example: When asked about documentation strategy, AI references the "Uncle's Garage" transformation narrative rather than just listing metrics*

3. **As a technical interviewer**, I want the AI to provide deep context about specific projects, so that I can prepare insightful interview questions.
   - *Example: AI knows the Marlowe tutorials were collaborative (with Knowledge Engineer and Software Developer), not sole-authored*

4. **As any evaluator**, I want the AI to adapt its emphasis based on what I'm asking about, so that answers feel relevant to my interests.
   - *Example: Questions about API work get API-specialist framing; questions about leadership get ownership framing — same facts, different emphasis*

5. **As a hiring manager for an ML/AI role**, I want the AI to honestly frame Joseph's AI experience, so that I can assess realistic fit.
   - *Example: AI says "one substantial AI project, not years of ML/AI engineering" — the honest self-assessment that builds trust*

## 6. Content Architecture

### 6.1 Accuracy Constraints (Critical — Implement First)

These constraints from `RESUME-NOTES.md` must be enforced in both the data layer and system prompt:

**Identity & Framing:**
- Preferred tagline: "Technical Writer Who Builds Tools" (not "Who Ships Code")
- Identity: "I'm a technical writer who develops" (not "developer who writes")

**Marlowe Documentation:**
- Tutorials & Starter Kit: **Collaborated** with Knowledge Engineer and Software Developer to integrate 41 tutorial pages. NOT "Built" or "Created" (implies sole authorship).
- OpenAPI Specification: **Worked closely with software developer** to integrate 91-schema OpenAPI spec. NOT "Created" or "Authored" the spec.

**Essential Cardano AI Assistant:**
- Deployed to production-level **test environment** for testing and evaluation. **Never publicly released.**
- Accurate: "Built and deployed a full-stack Next.js web application", "full project lifecycle from concept through deployment", "Test deployment"
- Inaccurate: "Shipped production application", "from concept through production", "Production deployment"

**Current violations in codebase:**
- `joseph-fajen.ts` line 36: "Deployed on Railway infrastructure, currently in production" — **INACCURATE**, should say "test deployment"
- `agent.py` line 16: "Shipped a production AI chatbot solo" — **INACCURATE**, should say "Built and deployed a full-stack AI chatbot solo"
- `joseph-fajen.ts` lines 44-45: "Built complete system solo — 91 commits, full project lifecycle" followed by production framing — needs accuracy pass
- `demoResponses.aiProject`: References "production-ready AI assistant" — should say "deployed AI assistant" or "test deployment"

### 6.2 Current Content Model (Approach 1 — Enrichment)

Keep the existing single-file architecture. Enrich it with:

```typescript
// joseph-fajen.ts — enriched structure

export const josephProfile = {
  // ... existing fields ...

  // NEW: Narrative content from source/resume.md
  narratives: {
    marloweTransformation: "The 'Uncle's Garage' Transformation...",
    aiAssistantStory: "When Documentation Needed AI...",
    chatdocStory: "Building Tools When Documentation Requires It...",
    educationPhilosophy: "The philosophy taught me to question assumptions...",
    earlierCareer: "From HP consulting to startup API documentation..."
  },

  // NEW: Accuracy constraints injected into system prompt
  contentGuidelines: {
    identity: "Technical Writer Who Builds Tools (not 'Who Ships Code')",
    accuracyRules: [
      "Essential Cardano AI Assistant was a test deployment, never publicly released",
      "Marlowe tutorials were collaborative, not sole-authored",
      "OpenAPI spec was integrated collaboratively, not authored solo"
    ],
    framingPreference: "I'm a technical writer who develops (not 'developer who writes')"
  },

  // NEW: Alternative emphasis angles (from cover letters and variations)
  emphasisAngles: {
    ownership: "Documentation strategist who owns the full lifecycle",
    builder: "Technical writer who builds tools and ships software",
    apiDeveloper: "API & developer documentation specialist",
    mlTooling: "Hands-on with Python, LLMs, and vector databases",
    verification: "Establish verification processes, ensure every code example compiles"
  }
};
```

### 6.3 Target Content Model (Approach 2 — Future Refactor)

Separate concerns into multiple files:

```
frontend/src/data/
  profile-core.ts        # Facts: companies, dates, metrics, skills
  profile-narratives.ts  # Story-based framing (from source/resume.md)
  profile-angles.ts      # Audience-specific emphasis overlays
  content-guidelines.ts  # Accuracy constraints from RESUME-NOTES.md
  demo-responses.ts      # Fallback responses (existing)
  fit-assessments.ts     # Fit assessment data (existing)
  index.ts               # Re-exports everything
```

System prompt instruction for multi-angle content:
> "You have multiple framings of Joseph's experience. Choose the framing that best fits the question being asked. If someone asks about API work, lean on the API-developer angle. If someone asks about leadership, lean on the ownership angle. Always respect the accuracy constraints — never overclaim."

### 6.4 System Prompt / Data Sync

The current system prompt (`agent.py`) hardcodes differentiators that can drift from the data layer. Two problems to fix:

1. **Remove hardcoded claims from `agent.py`** that duplicate or contradict `joseph-fajen.ts`. The system prompt should define *behavior* (how to respond) and reference *content* (from the profile context), not duplicate content.

2. **Add accuracy constraints to the system prompt.** The `contentGuidelines` field gets serialized into the profile context and explicitly referenced:

```python
CONTENT ACCURACY RULES (NEVER violate these):
{accuracy_rules}
```

## 7. Technology Stack

No new technologies. All changes are content and prompt engineering within existing architecture:
- Frontend: `joseph-fajen.ts` (TypeScript data)
- Backend: `agent.py` (system prompt), `chat.py` (unchanged)
- No new dependencies

## 8. Security & Configuration

No changes from Phase 1. Content enrichment doesn't affect the security surface.

One new consideration: the `contentGuidelines` are sent as part of the profile context to the Claude API. This is intentional — the accuracy constraints must be visible to the model. They contain no sensitive information.

## 9. API Specification

No API changes. The `/api/chat` endpoint continues to receive `profile_context` as a string. The string simply becomes richer and longer.

The profile context payload will grow from ~3KB to ~6-8KB. This is well within Claude's context window and adds negligible latency.

## 10. Success Criteria

### Phase 2 Success Definition

Phase 2 is successful when:
1. The AI never makes claims that violate `RESUME-NOTES.md` accuracy rules
2. The AI can reference narrative stories (Uncle's Garage, education philosophy) not just bullet metrics
3. The AI naturally adapts emphasis based on question type (API questions get API depth, leadership questions get ownership framing)
4. Demo/fallback responses reflect accurate language
5. System prompt and data layer are consistent — no contradictions

### Functional Requirements
- ✅ All accuracy violations from Section 6.1 are fixed
- ✅ `contentGuidelines` field exists and is injected into system prompt
- ✅ Narrative content from `source/resume.md` is available to the AI
- ✅ Cover letter angles are represented in the data layer
- ✅ System prompt references accuracy constraints explicitly
- ✅ Demo responses use accurate language

### Quality Indicators
- Ask "Tell me about the AI chatbot" → response says "test deployment", not "production"
- Ask "Did you build the Marlowe tutorials?" → response acknowledges collaboration
- Ask "Tell me about your documentation approach" → response uses narrative framing, not just bullets
- Ask "Are you technical enough for an ML team?" → honest scoping, references W&B-angle content

### Verification

**Manual testing (primary):**
1. Start backend: `cd backend && uvicorn app.main:app --reload --port 8000`
2. Start frontend: `cd frontend && npm run dev`
3. Open chat and test accuracy-sensitive questions:
   - "Tell me about the AI chatbot you built" — should NOT say "production"
   - "Did you create the Marlowe tutorials?" — should say "collaborated"
   - "What about the OpenAPI spec?" — should say "integrated collaboratively"
4. Test narrative richness:
   - "How do you approach a documentation project?" — should reference Uncle's Garage story
   - "What's your educational background?" — should reference philosophy/history insight
5. Test emphasis adaptation:
   - "Do you have API documentation experience?" — should emphasize API angle
   - "Can you lead a documentation team?" — should emphasize ownership angle

**Automated testing:**
- `cd frontend && npm test` — existing tests still pass
- `cd frontend && npm run build` — build succeeds
- `cd frontend && npm run lint` — no new lint errors

## 11. Implementation Phases

### Phase 2A: Accuracy Fixes (Do First)

**Goal:** Eliminate all known accuracy violations

**Deliverables:**
- Fix `joseph-fajen.ts` — Essential Cardano deployment language
- Fix `agent.py` — remove "shipped production" language
- Fix `demoResponses` — accurate framing throughout
- Add `contentGuidelines` to profile data
- Update `buildProfileContext()` in `AIChat.tsx` to include guidelines
- Update system prompt to reference accuracy constraints

**Validation:** Manual test all 3 accuracy-sensitive areas (AI chatbot, tutorials, OpenAPI)

### Phase 2B: Content Enrichment

**Goal:** Merge rich content from resume repo

**Deliverables:**
- Add `narratives` object with story-based content from `source/resume.md`
- Add `emphasisAngles` from cover letter variations
- Add earlier career narrative (15 years pre-IOHK)
- Add LinkedIn About section content
- Update `buildProfileContext()` to include new content sections
- Update demo/fallback responses with richer, narrative content

**Validation:** Manual test for narrative depth — AI references stories, not just metrics

### Phase 2C: Architecture Design (Design Only)

**Goal:** Document the Approach 2 content model for future implementation

**Deliverables:**
- TypeScript interfaces for multi-file content model
- Migration plan from monolithic to separated structure
- System prompt template for multi-angle content selection
- Document in `CLAUDE.md` or architecture doc

**Validation:** Design review — does the proposed structure accommodate Approach 3 cleanly?

## 12. Content Source Mapping

Where each piece of enrichment content comes from:

| Content | Source File | Target Location |
|---------|------------|----------------|
| Uncle's Garage narrative | `resume/source/resume.md` | `josephProfile.narratives.marloweTransformation` |
| AI Assistant story | `resume/source/resume.md` | `josephProfile.narratives.aiAssistantStory` |
| ChatDoc story | `resume/source/resume.md` | `josephProfile.narratives.chatdocStory` |
| Education philosophy | `resume/source/resume.md` | `josephProfile.narratives.educationPhilosophy` |
| Earlier career (2001-2015) | `resume/source/resume.md` | `josephProfile.narratives.earlierCareer` |
| Accuracy rules | `resume/RESUME-NOTES.md` | `josephProfile.contentGuidelines` |
| Identity framing | `resume/RESUME-NOTES.md` | `josephProfile.contentGuidelines.identity` |
| Ownership angle | `resume/J-Fajen-*-subagent-1-*.md` | `josephProfile.emphasisAngles.ownership` |
| Builder angle | `resume/J-Fajen-*-subagent-1-v2.md` | `josephProfile.emphasisAngles.builder` |
| API/Developer angle | `resume/J-Fajen-*-subagent-3-*.md` | `josephProfile.emphasisAngles.apiDeveloper` |
| ML/Tooling angle | `resume/draft-cover-letter.md` (W&B) | `josephProfile.emphasisAngles.mlTooling` |
| Verification angle | `resume/cover-letter-midnight-draft.md` | `josephProfile.emphasisAngles.verification` |
| LinkedIn summary | `resume/LinkedIn-About-Section-Jan-2026.md` | Alternative summary content |

## 13. Future Considerations

### Approach 3: Job-Aware Dynamic Mode (Post Phase 2)

If Phase 2 proves the value of richer content, Approach 3 adds:
- UI element where visitors optionally describe their role/company
- Dynamic system prompt adaptation using job-specific fit analysis data
- Import of `jobs/*/analysis.md` content (strengths, gaps, emphasis/minimize guidance)
- `config.yaml` structure from resume repo as configuration format

**Prerequisites:** Approach 2 content separation must be complete first. The multi-file structure makes dynamic selection tractable.

**Risk:** Could feel manipulative if not done with the same honesty tone. The AI should never hide gaps — only adjust which strengths it leads with.

### Content Sync Workflow

As the resume repo evolves (new job applications, refined narratives), content should flow into ai-resume-chat. Options:
- Manual: Copy-paste on update (current approach, sufficient for now)
- Script: Build script that reads resume repo and generates TypeScript data
- Shared: npm/symlink to resume repo content (brittle, not recommended)

### Resume Repo as Content CMS

The resume repo's `jobs/*/config.yaml` structure is effectively a content management system. If Approach 3 is pursued, this becomes the canonical content source, with ai-resume-chat as a consumer.

## 14. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Content grows too large for context window** | Medium — degraded responses | Current enrichment adds ~4KB. Claude's context window is 200K. Not a concern for Approach 1-2. Monitor if Approach 3 adds job-specific content. |
| **Accuracy constraints ignored by model** | High — damages credibility | Make constraints explicit and prominent in system prompt. Test specific violation scenarios. Consider adding "NEVER say X, ALWAYS say Y" format. |
| **System prompt and data drift again** | Medium — inconsistency | Phase 2A removes hardcoded content from system prompt. System prompt defines behavior; data layer provides content. Document this principle in CLAUDE.md. |
| **Multiple emphasis angles confuse the model** | Medium — incoherent responses | Test with adversarial questions that could trigger competing framings. The system prompt instruction should be clear: "choose the angle that best fits the question." |
| **Over-engineering content structure** | Low — wasted effort | Approach 1 is deliberately minimal. Approach 2 is design-only in this phase. Only build what's needed. |

## 15. Appendix

### Related Documents
- [PRD_MVP.md](PRD_MVP.md) — Phase 1 build document (all phases complete)
- `/Users/josephfajen/git/resume/README.md` — Resume repo build system documentation
- `/Users/josephfajen/git/resume/RESUME-NOTES.md` — Accuracy constraints (canonical source)

### Key Files to Modify

| File | Changes |
|------|---------|
| `frontend/src/data/joseph-fajen.ts` | Fix accuracy violations, add narratives, guidelines, emphasis angles |
| `backend/app/core/agent.py` | Fix accuracy violations, add accuracy constraints section, remove hardcoded content |
| `frontend/src/components/AIChat.tsx` | Update `buildProfileContext()` to include new data sections |
| `CLAUDE.md` | Document content architecture principles and accuracy constraint workflow |

### Content Variation Inventory (Resume Repo)

| Variation | Emphasis Angle | Source |
|-----------|---------------|--------|
| subagent-1-v1 | Documentation Owner & Leader | `resume/J-Fajen-*-subagent-1-v1.md` |
| subagent-1-v2 | Documentation Engineer / Writer Who Builds | `resume/J-Fajen-*-subagent-1-v2.md` |
| subagent-2-v1 | Impact metrics table | `resume/J-Fajen-*-subagent-2-v1.md` |
| subagent-2-v2 | Story-based (Challenge/Action/Result) | `resume/J-Fajen-*-subagent-2-v2.md` |
| subagent-3-v1 | API & Developer Documentation Specialist | `resume/J-Fajen-*-subagent-3-v1.md` |
| Midnight cover letter | Verification & DevRel integration | `resume/cover-letter-midnight-draft.md` |
| W&B cover letter | ML/AI tooling & Python | `resume/draft-cover-letter.md` |
| Okta application | Tutorial creation & community engagement | `resume/jobs/okta-developer-content/` |
| Vercel application | Builder identity & AI Cloud | `resume/jobs/vercel-content-engineer/` |
| Ripple application | API/blockchain IC | `resume/jobs/ripple-staff-tw/` |
| Starburst application | Management/leadership angle | `resume/jobs/starburst-tw-manager/` |
