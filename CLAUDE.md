# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run lint         # Run ESLint
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
```

Run a single test file:
```bash
npx vitest run src/test/example.test.ts
```

## Architecture

This is an interactive resume website for "Marcus Chen" (fictional Staff Engineer) featuring a simulated AI chat interface.

### Data-Driven Design

All resume content lives in `src/data/marcus-profile.ts`:
- Profile info, experience, skills, documented failures
- `demoResponses` - Pre-written AI responses keyed by topic
- `fitAssessments` - Strong/weak fit evaluations
- `systemPrompt` - Instructions for how an AI should represent Marcus

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

The `failures` array follows a similar pattern with `details` and `lessons` fields for honest self-assessment.

### AI Chat (Demo Mode)

`src/components/AIChat.tsx` simulates AI responses using keyword matching:
- No actual AI API integration
- `getResponse()` matches keywords to select from `demoResponses`
- Typing animation creates illusion of real-time generation

To add real AI: replace `getResponse()` with API call, keep the `typeResponse()` animation.

### Page Composition

`src/pages/Index.tsx` composes the single-page layout:
```
Header → Hero → Experience → FitAssessment → Footer
         ↓
      AIChat (modal overlay, triggered by "Ask AI About Me" button)
```

### UI Components

Uses shadcn/ui pattern - components copied into `src/components/ui/` (not npm installed). These are Radix UI primitives with Tailwind styling. Most are unused; they came with the Lovable.dev template.

### Styling

- Tailwind with CSS variables for theming (defined in `src/index.css`)
- Custom animations: `animate-fade-in`, `animate-slide-up`, `animate-pulse-soft`
- Colors use semantic tokens: `bg-background`, `text-foreground`, `bg-accent`, etc.

## TypeScript Configuration

Relaxed settings for rapid development:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`

Path alias: `@/` maps to `src/`
