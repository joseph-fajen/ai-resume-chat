# Prompt Optimization Work Session

**Date:** 2026-01-17
**Objective:** Optimize all prompts to emphasize builder mentality, technical depth, and strategic thinking

## Summary

Completed all 6 phases of prompt optimization. All files pass TypeScript compilation and tests.

## Changes by Phase

### Phase 1: System Prompt Reframe
**File:** `backend/app/core/agent.py`

Added explicit differentiator guidance:
- **JOSEPH'S DIFFERENTIATORS section** — tells Claude to lead with: builds things, technical depth, strategic thinker, documentation leader
- **WHAT TO DE-EMPHASIZE section** — avoid generic collaboration language, don't frame as "just a writer"
- **Updated common question handling** — added "Is he technical enough?" and "Can he lead?" responses
- **Updated "doesn't want" section** — "Don't make him sound like every other technical writer"

### Phase 2: Profile Data Restructure
**File:** `frontend/src/data/joseph-fajen.ts`

Major structural changes:
- **New `positioning` field** — "I don't just write about technology — I build with it"
- **New `featuredProject` object** — elevates AI chatbot from buried highlight to top-level differentiator
- **Reframed `subtitle`** — "Technical writer who builds — AI chatbots, documentation systems, and developer tools"
- **Reframed `summary`** — leads with "Technical writer who ships software"
- **Reframed `skills`** — moved "Building Documentation Tools" and "AI/LLM Application Development" to strong skills
- **Updated `status`** — "Seeking Senior Technical Writer or Documentation Lead roles"

### Phase 3: Context Builder Update
**File:** `frontend/src/components/AIChat.tsx`

Rewrote `buildProfileContext()` to:
- Lead with `positioning` and `featuredProject`
- Include full `aiContext` (was missing `technicalWork` and `lessonsLearned`)
- Structure data to emphasize differentiators
- Include full failure details, not just summaries

### Phase 4: Suggested Questions Revision
**File:** `frontend/src/components/AIChat.tsx`

Replaced generic questions with differentiator-focused ones:
```typescript
const suggestedQuestions = [
  "Tell me about the AI chatbot you built — what was the technical approach?",
  "Is this person technical enough to work directly with engineers?",
  "What's the difference between a technical writer and a documentation lead?",
  "Tell me about a failure and what you learned from it.",
];
```

### Phase 5: Demo Response Update
**File:** `frontend/src/data/joseph-fajen.ts`

Replaced all demo responses with new keys and content:
- `default` — leads with "he ships software" differentiator
- `aiProject` — detailed technical breakdown of the chatbot
- `technicalDepth` — addresses "technical enough" question directly
- `failure` — both failures with full context
- `leadershipReady` — explains IC lead vs. people manager distinction

Also updated `fitAssessments` to:
- Lead with technical depth and strategy ownership
- Clarify people management gap
- Use builder/strategic language throughout

### Phase 6: Verification
All checks pass:
- ✅ TypeScript compilation
- ✅ Frontend tests (1/1)
- ✅ Python syntax validation

## Files Modified

| File | Lines Changed |
|------|---------------|
| `backend/app/core/agent.py` | +26 |
| `frontend/src/components/AIChat.tsx` | +68/-27 |
| `frontend/src/data/joseph-fajen.ts` | +129/-60 |

## Key Messaging Changes

| Before | After |
|--------|-------|
| "20+ years transforming complex technical concepts" | "Technical writer who ships software" |
| "Expert at building relationships" | "I don't just write about technology — I build with it" |
| "Cross-functional collaboration" | "Technical depth and strategic ownership" |
| AI project buried in highlights | Featured project with full technical breakdown |
| Skills: "JavaScript & Python" in moderate | Skills: "Building Documentation Tools" in strong |

## Next Steps for Testing

1. **Start the backend:** `cd backend && uvicorn app.main:app --reload --port 8000`
2. **Start the frontend:** `cd frontend && npm run dev`
3. **Test these questions:**
   - "Tell me about this candidate" (should lead with builder/shipper framing)
   - "Is he technical enough?" (should give confident yes with specifics)
   - "What makes him different from other technical writers?" (should emphasize builds things)
   - "Can he lead a documentation team?" (should clarify IC lead vs. people manager)

## Rollback

If needed, all changes can be reverted with:
```bash
git checkout HEAD -- backend/app/core/agent.py frontend/src/components/AIChat.tsx frontend/src/data/joseph-fajen.ts
```
