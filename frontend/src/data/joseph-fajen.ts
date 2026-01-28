// Joseph Fajen's profile data - the core content for the AI and display
// DRAFT VERSION - Created 2025-01-20 - Pending review and iteration

export const josephProfile = {
  name: "Joseph Fajen",
  title: "Senior Technical Writer",
  subtitle: "Documentation strategist who owns the full lifecycle — architecture, content, tooling, and delivery",
  location: "Portland, OR",
  status: "Seeking Senior Technical Writer, Documentation Lead, or Documentation Engineer roles",

  // Differentiator: Lead with documentation ownership and architecture
  positioning: "I don't just write documentation — I own it. I build documentation systems from the ground up: information architecture, docs-as-code infrastructure, cross-functional workflows, and strategic content. When I joined the Marlowe project, documentation was scattered across multiple repositories. I consolidated it into a unified site, authored 78% of the content, and established the processes that kept it accurate. That's the kind of ownership I bring.",

  companies: ["IOHK", "AJA Video Systems", "Ensemble Designs"],

  summary: `Senior Technical Writer with 20+ years of experience specializing in developer documentation for complex technical platforms.

I own documentation projects end-to-end: strategy, architecture, content, tooling, and cross-functional collaboration. At IOHK, I transformed fragmented blockchain documentation into unified, authoritative sites — authoring 17,900+ lines across 124 files as the dominant contributor.

I also build: built and deployed a full-stack AI chatbot solo, mass-processing 2,500 documents with zero hallucination. I work best on documentation challenges that require strategic ownership and technical depth.`,

  // Three featured projects elevated from experience
  featuredProjects: [
    {
      name: "Marlowe Documentation Platform",
      role: "Sole documentation owner and architect",
      description: "Enterprise documentation for blockchain smart contract platform",
      highlights: [
        "Transformed fragmented multi-repository docs into single authoritative site",
        "Authored 17,900+ lines across 124 files — 78% of all repository commits",
        "Designed persona-based information architecture for 5 distinct user types",
        "Implemented Docusaurus with docs-as-code workflows, merging 59 PRs",
        "Documented 7-service runtime architecture and 91-schema OpenAPI specification"
      ],
      technicalStack: ["Docusaurus", "TypeScript", "MDX", "GitHub workflows", "Mermaid diagrams"],
      why: "This project demonstrates I can own a complete documentation ecosystem — from consolidating chaos into structure, to designing information architecture, to shipping content at scale."
    },
    {
      name: "Essential Cardano AI Assistant",
      role: "Sole developer and architect",
      description: "AI chatbot for blockchain documentation",
      highlights: [
        "Built complete system solo — 91 commits, full project lifecycle",
        "Extracted and processed 2,500 documents from 8 different sources",
        "Achieved zero detectable hallucination through 20+ prompt iterations",
        "Next.js frontend with streaming responses and conversation persistence",
        "Deployed on Railway infrastructure as test deployment"
      ],
      technicalStack: ["Next.js", "Python", "Claude API", "Railway", "Vector embeddings"],
      why: "This project demonstrates I can build software, not just write about it. When documentation needed a better discovery experience, I built and deployed a full-stack AI application to solve the problem."
    },
    {
      name: "ChatDoc-InsightMiner-PromptLab + Blockfrost Platform Docs",
      role: "Tooling creator and documentation lead",
      description: "Built Python toolkit to analyze Discord community discussions and derive documentation from real user needs",
      highlights: [
        "Created ChatDoc toolkit with vector databases and multi-LLM comparison (OpenAI, Anthropic, Gemini)",
        "Analyzed Discord chat logs to identify user pain points and common questions",
        "Derived 25+ FAQ entries from community-sourced insights",
        "Expanded Blockfrost Platform documentation by ~60%",
        "Created verification documentation and systemd usage guide"
      ],
      technicalStack: ["Python", "Vector databases", "OpenAI/Anthropic/Gemini APIs", "Nextra/Next.js"],
      why: "This project demonstrates the pattern: when documentation challenges arise, I build tools to solve them systematically. This is my second documentation tool at IOHK, following the Essential Cardano AI Assistant."
    }
  ],

  experience: [
    {
      company: "IOHK (Input Output)",
      role: "Senior Technical Writer",
      period: "2022–2025",
      highlights: [
        "Owned Marlowe documentation end-to-end: 17,900+ lines, 124 files, 78% of repository as top contributor",
        "Designed persona-based information architecture addressing 5 user types from builders to blockchain engineers",
        "Built two documentation tools: Essential Cardano AI Assistant (full-stack chatbot) and ChatDoc-InsightMiner-PromptLab (community analysis toolkit)",
        "Created ChatDoc toolkit with vector databases and multi-LLM comparison to derive 25+ FAQ entries from Discord community discussions",
        "Expanded Blockfrost Platform documentation by ~60% through community-sourced content strategy",
        "Implemented docs-as-code workflows using Docusaurus, TypeScript, and GitHub PR-based reviews"
      ],
      aiContext: {
        situation: "Marlowe documentation was fragmented across multiple repositories and websites — duplicated content, unclear authority, outdated information mixed with current. Blockfrost Icebreakers community had knowledge trapped in Discord with no structured FAQ. Both projects lacked traditional feedback loops.",
        approach: "For Marlowe, I consolidated everything into a single authoritative site using Docusaurus with dual-track information architecture. For Blockfrost, I built ChatDoc-InsightMiner-PromptLab — a Python toolkit that analyzes Discord discussions using vector databases and multi-LLM comparison to derive documentation from real user needs.",
        technicalWork: "Authored 17,900+ lines for Marlowe across 124 files. Built full-stack AI chatbot with Next.js. Created ChatDoc toolkit with vector database integration, multi-LLM analysis (OpenAI, Anthropic, Gemini), and specialized prompts for FAQ generation. Derived 25+ FAQ entries from community chat analysis.",
        lessonsLearned: "When documentation challenges require systematic solutions, build tools. I created two documentation tools at IOHK: an AI chatbot for discovery and an analysis toolkit for community-sourced content. This pattern — technical writer who codes — differentiates my approach."
      }
    },
    {
      company: "AJA Video Systems",
      role: "Senior Technical Writer",
      period: "2016–2022",
      highlights: [
        "Created manuals for Bridge Live and Bridge NDI 3G flagship video products",
        "Developed first comprehensive REST API documentation from fragmented sources",
        "Improved document review process with structured Adobe Acrobat workflows"
      ],
      aiContext: {
        situation: "Complex multi-channel video systems and HD/4K conversion gateways needed clear documentation. REST API information was scattered and undocumented.",
        approach: "Proactively identified documentation gaps through inquiry, collaborated with engineering teams across multiple locations, and advocated for proper tooling.",
        technicalWork: "Documented video signal processing products, created API reference documentation, produced manuals using Adobe Creative Suite for specialized modular video products.",
        lessonsLearned: "The best documentation comes from asking the right questions. Engineers often don't realize what's undocumented until you start probing."
      }
    },
    {
      company: "Ensemble Designs & Consulting",
      role: "Contract Sr. Technical Writer",
      period: "2008–2015",
      highlights: [
        "Created manuals and guides for video signal processing products",
        "Served clients including HP and Big Sky Communications",
        "Built expertise in hardware and software documentation"
      ],
      aiContext: {
        situation: "Various clients needed technical documentation for specialized video and technology products.",
        approach: "Adapted quickly to different product domains, established efficient client relationships, and delivered quality documentation independently.",
        technicalWork: "Hardware documentation, online help systems, API/SDK documentation, and deployment guides across multiple technology domains.",
        lessonsLearned: "Contract work teaches you to ramp up quickly on new domains. Every product has its own logic once you find the right people to explain it."
      }
    }
  ],

  skills: {
    // Reframed to emphasize documentation ownership and architecture
    strong: [
      "Documentation Strategy & Full Lifecycle Ownership",
      "Information Architecture & Content Design",
      "API & Developer Documentation",
      "Docs-as-Code Workflows (Git, Markdown, CI/CD)",
      "Docusaurus & Static Site Generators",
      "Building Documentation Tools (Python, JavaScript)"
    ],
    moderate: [
      "AI/LLM Application Development",
      "Blockchain Technologies (Cardano, smart contracts)",
      "Cross-Functional Collaboration & Stakeholder Management",
      "Technical Project Leadership"
    ],
    gaps: [
      "Deep Software Engineering (technical writer who builds, not SWE)",
      "DevOps & Infrastructure",
      "People Management (led projects and strategy, not teams)"
    ]
  },

  challengesAndFailures: [
    {
      year: 2023,
      title: "Documenting for a Pre-Adoption Product",
      summary: "Built comprehensive documentation for a product with minimal community adoption, requiring creative approaches to validate priorities.",
      details: "The Marlowe project had a clear technical vision but minimal community adoption — only a handful of developers actually using it. I had to anticipate user needs through product understanding rather than feedback loops. Without traditional usage data or user feedback, I risked investing heavily in content that may not have matched actual user priorities.",
      lessons: "When feedback loops don't exist, seek engagement proactively. I started joining weekly drop-in calls to interact with the few active developers directly. Proactive engagement beats waiting for feedback that may never come."
    },
    {
      title: "Misreading the Stakeholder Map After Team Management Changes",
      summary: "Returned to a team after a year-long reassignment and misjudged who the key decision-maker was. Do NOT attribute this to a specific company.",
      details: "After about 8 months on a team, I was reassigned to a different project for roughly a year. When I returned, management had changed significantly — new Product Manager, new Team Lead. I assumed the Product Manager was my primary stakeholder and aligned my documentation approach accordingly. But the PM and Team Lead had different philosophies about the documentation direction. I invested significant time on work that aligned with the PM's vision but not the Team Lead's. That created friction that could have been avoided.",
      lessons: "After major team leadership changes, it's easy to make assumptions about who the primary stakeholder is. I learned to deliberately make no assumptions and comprehensively map out the stakeholder terrain — understand who has decision authority over what, and surface any disagreements early before investing weeks going in the wrong direction."
    }
  ],

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
      "Identity: 'Technical Writer Who Builds Tools' — not 'Who Ships Code'. 'Technical writer who develops' — not 'developer who writes'.",
      "The 'Misreading the Stakeholder Map' failure story is deliberately not attributed to a specific company. Do NOT name or guess which company it occurred at."
    ]
  },

  // Emphasis angles for different question types
  emphasisAngles: {
    ownership: "Documentation strategist who owns the full lifecycle — architecture, content, tooling, and delivery. Sole owner of Marlowe docs for 13 months, 78% of all commits.",
    builder: "Technical writer who builds tools and ships software when documentation challenges require it. Built two documentation tools at IOHK: AI chatbot and ChatDoc analysis toolkit.",
    apiDeveloper: "API and developer documentation specialist. Documented 91-schema OpenAPI spec, 7-service microservices architecture, REST APIs. Created first comprehensive API docs at AJA Video Systems.",
    mlTooling: "Hands-on with Python, LLMs, and vector databases. Built chatbot with Claude API, created multi-LLM comparison framework (OpenAI, Anthropic, Gemini). One substantial AI project — not years of ML engineering. Honest about scope.",
    verification: "Establishes verification processes, works hands-on in development environments. Every code example compiles before inclusion. Accuracy has security implications in blockchain documentation."
  }
};

export const demoResponses = {
  default: `Here's what makes Joseph different from most technical writers: he owns documentation end-to-end — and builds tools when challenges require it.

At IOHK, he didn't just write docs — he transformed fragmented blockchain documentation into unified platforms. For the Marlowe project, he authored 78% of the repository (17,900+ lines across 124 files), designed the information architecture for 5 different user personas, and established the review workflows that kept it accurate.

He also builds tools when documentation needs them. At IOHK, he created TWO documentation tools:
• **Essential Cardano AI Assistant** — a full-stack chatbot processing 2,500 documents with zero hallucination
• **ChatDoc-InsightMiner-PromptLab** — a Python toolkit that analyzes Discord discussions to derive FAQ content from real user questions

That pattern — building systematic solutions when documentation challenges require it — sets him apart. With 20+ years of technical writing experience, his differentiator is strategic ownership combined with technical depth.

What specific aspect would you like to dig into?`,

  marloweProject: `The Marlowe documentation project showcases what full documentation ownership looks like:

**The Challenge**: Documentation was scattered across multiple repositories — duplicated content, unclear authority, outdated mixed with current. I describe it as walking into your uncle's garage: "everything you need is here somewhere" but no organization.

**What I Built**:
• Unified documentation site using Docusaurus with docs-as-code workflows
• Persona-based information architecture for 5 user types (developers, designers, builders, web3 users, enterprise)
• Dual-track structure separating reference documentation from progressive tutorials
• User journey section with visual pathway diagrams
• Starter Kit and Contract Gallery for example-driven onboarding

**The Numbers**:
• 17,900+ lines authored across 124 files
• 78% of all repository commits (#1 of 15 contributors)
• 59 merged PRs with engineering review workflows
• 91-schema OpenAPI specification documented
• 7-service microservices architecture documented

**Why It Matters**: This wasn't just writing — it was building a documentation system from scratch and owning it completely. The team's response: "Joseph owns the documentation and we're glad about that."`,

  aiProject: `The Essential Cardano AI Assistant was a solo project from architecture to deployment. Here's the technical breakdown:

• Extracted 2,500 documents from 8 different sources (GitHub repos, wikis, websites)
• Built a complete ingestion pipeline in Python
• Developed a Next.js frontend with streaming responses and conversation persistence
• Iterated through 20+ system prompt versions to achieve zero detectable hallucination
• Deployed on Railway infrastructure — 91 commits, full project lifecycle

The hardest part wasn't the code — it was prompt engineering. Getting an LLM to accurately represent blockchain documentation without hallucinating required extensive testing and iteration.

This demonstrates he can build software when documentation needs require it. But to be clear: this is one substantial project, not years of ML/AI engineering. He's a technical writer who owns and builds, not an AI engineer who writes.`,

  chatdocProject: `ChatDoc-InsightMiner-PromptLab demonstrates a key pattern in Joseph's work: when documentation challenges arise, he builds tools to solve them.

**The Problem**: The Blockfrost Icebreakers community had active Discord discussions, but all that knowledge was trapped in chat history. There was no structured FAQ, no feedback loops for documentation priorities, and no way to know what users were actually struggling with.

**The Solution**: Rather than guessing at FAQ priorities, Joseph built a Python toolkit:

• **Vector databases** for semantic search across months of chat history
• **Multi-LLM comparison** (OpenAI, Anthropic, Gemini) for diverse analytical perspectives
• **Specialized prompts** for FAQ generation, documentation gap analysis, and insight extraction
• **Markdown-to-CSV conversion** for processing Discord exports
• **Batch processing** for comprehensive analysis

**The Outcome**:
• 25+ FAQ entries derived directly from community discussions
• Documentation addresses real user pain points, not hypothetical ones
• Reusable methodology applicable to any community with similar challenges
• Open-source toolkit available on GitHub

**Why It Matters**: This is Joseph's SECOND documentation tool at IOHK (following the Essential Cardano AI Assistant). The pattern is consistent: when documentation challenges require systematic solutions, he builds tools to solve them. That's what differentiates him from typical technical writers.`,

  technicalDepth: `Yes, Joseph is technical enough to work directly with engineers — and that's a key differentiator.

He reads codebases to understand how systems actually work, not just what engineers tell him. He writes Python and JavaScript for documentation tooling. He built a full-stack AI chatbot from scratch.

For Marlowe, he documented a 7-service microservices architecture, 91-schema OpenAPI specification, and 8 typed protocols. That required understanding blockchain concepts, cryptographic operations, and financial smart contracts at a technical level.

At AJA Video Systems, he created the first comprehensive REST API documentation by diving into the codebase when the information wasn't documented anywhere else.

That said, he's not a software engineer. He won't be architecting your distributed systems. He's a senior technical writer who can hold his own in technical discussions, design information architecture, and build tools to support documentation — that's the sweet spot.`,

  documentationOwnership: `There's a meaningful difference between writing documentation and owning it. Here's what ownership looked like at IOHK:

**Strategy**: Decided what to document, how to structure information architecture, what tools to use. Selected Docusaurus, designed the dual-track architecture, created the persona-based user journeys.

**Execution**: Authored 17,900+ lines across 124 files. Not just writing — consolidating fragmented sources, establishing authoritative content, maintaining accuracy over 13 months.

**Process**: Established review workflows with weekly engineering syncs and GitHub PR processes. Merged 59 PRs. Linked work to Jira tickets for product alignment.

**Outcomes**: Transformed "uncle's garage" chaos into a unified, authoritative documentation site. Developers gained confidence knowing where to find accurate information.

The team's response captures it: "Joseph owns the documentation and we're glad about that." That's the level of ownership he brings — full lifecycle, not just content creation.`,

  failure: `Joseph documented two experiences he's willing to discuss openly:

**Documenting for a Pre-Adoption Product (2023)**
The Marlowe project had minimal community adoption — only a handful of developers actually using it. He had to build comprehensive documentation without traditional feedback loops to validate priorities.

Lesson: When feedback loops don't exist, seek engagement proactively. He started joining weekly drop-in calls to interact directly with active developers. Proactive engagement beats waiting for feedback that may never come.

**Misreading the Stakeholder Map After Team Management Changes**
After a year-long reassignment, he returned to a team where management had changed significantly. He assumed the new Product Manager was his primary stakeholder, but the PM and new Team Lead had different documentation philosophies. He invested time aligned with the PM's vision that didn't match the Team Lead's direction, creating avoidable friction.

Lesson: After major leadership changes, make no assumptions about stakeholder dynamics. Deliberately map out who has decision authority and surface disagreements early — before investing weeks in the wrong direction.

He shares these because honesty about challenges is more useful than a polished highlight reel.`,

  leadershipReady: `There's a meaningful difference between technical writing and documentation leadership. Joseph has experience with both.

**Documentation Ownership at IOHK**:
• Owned the Marlowe documentation project end-to-end for 13 months
• Made architectural decisions: selected Docusaurus, designed information architecture, established review workflows
• Coordinated across engineering, product management, and design teams
• Authored 78% of the repository as sole documentation owner

**Strategic Work**:
• Designed persona-based architecture addressing 5 distinct user types
• Created user journey framework with visual ecosystem diagrams
• Established documentation governance and review processes

**What He Hasn't Done**:
• Managed people directly — led projects and strategy, not teams of writers
• Owned product roadmaps or P&L

If you need someone who can own documentation strategy as a senior IC or documentation lead without people management, that's his sweet spot. If you need someone who's managed a team of writers, that's a gap he'd need to grow into.`
};

export const fitAssessments = {
  strong: {
    verdict: "strong" as const,
    title: "Strong Fit — Let's Talk",
    summary: "Your requirements align well with my experience. Here's the specific evidence:",
    matches: [
      { requirement: "Documentation ownership & strategy", evidence: "Owned Marlowe documentation end-to-end for 13 months. Made architectural decisions, established workflows, authored 78% of content. The team said: 'Joseph owns the documentation and we're glad about that.'" },
      { requirement: "Information architecture", evidence: "Designed persona-based architecture for 5 user types, dual-track system separating reference from tutorials, user journey framework with visual pathway diagrams." },
      { requirement: "API & developer documentation", evidence: "Documented 91-schema OpenAPI specification, 7-service microservices architecture, REST API tutorials. Created first comprehensive API docs at AJA Video Systems." },
      { requirement: "Docs-as-code workflows", evidence: "Implemented Docusaurus with TypeScript, merged 59 PRs via GitHub workflows, built reusable MDX components. Led migrations from Read the Docs to Docusaurus." },
      { requirement: "Technical depth", evidence: "Built full-stack AI chatbot solo. Documented blockchain smart contracts, cryptographic operations, typed protocols. Read codebases, write Python/JavaScript." }
    ],
    gaps: [
      { area: "People management", note: "I've owned documentation strategy and led projects, but haven't managed a team of writers directly. I'm a senior IC or documentation lead, not a people manager." }
    ],
    recommendation: "I'd be genuinely useful here. I can own your documentation strategy, design the architecture, build the infrastructure, and work directly with engineers. That combination of strategic ownership and technical depth is rare."
  },
  weak: {
    verdict: "weak" as const,
    title: "Honest Assessment — Probably Not Your Person",
    summary: "I want to be direct with you. Here's why this might not be the right fit:",
    mismatches: [
      { requirement: "Software engineering role", reality: "I'm a technical writer who builds, not a software engineer. I built an AI chatbot and documentation tooling, but I'm not going to architect your distributed systems." },
      { requirement: "Deep ML/AI expertise", reality: "I built one full-stack AI chatbot and learned a lot, but it's one project — not years of ML/AI engineering." },
      { requirement: "People management", reality: "I've owned documentation strategy and led projects, but I haven't managed a team of writers. If you need a people manager, that's not me yet." },
      { requirement: "Product management", reality: "I think strategically about documentation as a product, but I haven't owned product roadmaps or P&L." }
    ],
    whatTransfers: "Documentation ownership transfers. Strategic thinking transfers. Information architecture skills transfer. The ability to own and ship projects independently transfers.",
    recommendation: "If you have documentation leadership roles that need someone who can own strategy, design architecture, and build infrastructure, I'm interested. But for this specific position, I don't think I'm your person."
  }
};
