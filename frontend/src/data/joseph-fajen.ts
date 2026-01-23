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

I also build: shipped a production AI chatbot solo, mass-processing 2,500 documents with zero hallucination. I work best on documentation challenges that require strategic ownership and technical depth.`,

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
      why: "This project demonstrates I can own a complete documentation ecosystem — from consolidating chaos into structure, to designing information architecture, to shipping production content at scale."
    },
    {
      name: "Essential Cardano AI Assistant",
      role: "Sole developer and architect",
      description: "Production AI chatbot for blockchain documentation",
      highlights: [
        "Built complete system solo — 91 commits, full project lifecycle",
        "Extracted and processed 2,500 documents from 8 different sources",
        "Achieved zero detectable hallucination through 20+ prompt iterations",
        "Next.js frontend with streaming responses and conversation persistence",
        "Deployed on Railway infrastructure, currently in production"
      ],
      technicalStack: ["Next.js", "Python", "Claude API", "Railway", "Vector embeddings"],
      why: "This project demonstrates I can build software, not just write about it. When documentation needed a better discovery experience, I shipped a production AI application to solve the problem."
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
        "Built two documentation tools: Essential Cardano AI Assistant (production chatbot) and ChatDoc-InsightMiner-PromptLab (community analysis toolkit)",
        "Created ChatDoc toolkit with vector databases and multi-LLM comparison to derive 25+ FAQ entries from Discord community discussions",
        "Expanded Blockfrost Platform documentation by ~60% through community-sourced content strategy",
        "Implemented docs-as-code workflows using Docusaurus, TypeScript, and GitHub PR-based reviews"
      ],
      aiContext: {
        situation: "Marlowe documentation was fragmented across multiple repositories and websites — duplicated content, unclear authority, outdated information mixed with current. Blockfrost Icebreakers community had knowledge trapped in Discord with no structured FAQ. Both projects lacked traditional feedback loops.",
        approach: "For Marlowe, I consolidated everything into a single authoritative site using Docusaurus with dual-track information architecture. For Blockfrost, I built ChatDoc-InsightMiner-PromptLab — a Python toolkit that analyzes Discord discussions using vector databases and multi-LLM comparison to derive documentation from real user needs.",
        technicalWork: "Authored 17,900+ lines for Marlowe across 124 files. Built production AI chatbot with Next.js. Created ChatDoc toolkit with vector database integration, multi-LLM analysis (OpenAI, Anthropic, Gemini), and specialized prompts for FAQ generation. Derived 25+ FAQ entries from community chat analysis.",
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

  // DRAFT: These failure stories need careful review and iteration
  // Placeholder content based on Marlowe experience - to be refined
  failures: [
    {
      year: 2023,
      title: "Building for Users Who Weren't There Yet",
      summary: "Created comprehensive documentation without meaningful user feedback to guide priorities.",
      details: "The Marlowe project had a clear technical vision but minimal community adoption — only a handful of developers actually using it. I had to anticipate user needs through product understanding rather than feedback loops. While the documentation was well-structured, I sometimes invested heavily in content that may not have matched actual user priorities.",
      lessons: "When feedback loops don't exist, seek engagement proactively. I started joining weekly drop-in calls to interact with the few active developers directly. Proactive engagement beats waiting for feedback that may never come."
    },
    {
      year: 2019,
      title: "The Over-Detailed API Reference",
      summary: "Created comprehensive API documentation that overwhelmed users.",
      details: "I documented every edge case and parameter variation so thoroughly that developers couldn't find the basic getting-started information they needed.",
      lessons: "Good documentation has layers. Lead with the common cases, put edge cases in expandable sections or appendices."
    }
  ]
};

export const demoResponses = {
  default: `Here's what makes Joseph different from most technical writers: he owns documentation end-to-end — and builds tools when challenges require it.

At IOHK, he didn't just write docs — he transformed fragmented blockchain documentation into unified platforms. For the Marlowe project, he authored 78% of the repository (17,900+ lines across 124 files), designed the information architecture for 5 different user personas, and established the review workflows that kept it accurate.

He also builds tools when documentation needs them. At IOHK, he created TWO documentation tools:
• **Essential Cardano AI Assistant** — a production chatbot processing 2,500 documents with zero hallucination
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

He reads codebases to understand how systems actually work, not just what engineers tell him. He writes Python and JavaScript for documentation tooling. He built a production AI chatbot from scratch.

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

**Building for Users Who Weren't There Yet (2023)**
The Marlowe project had minimal community adoption — only a handful of developers actually using it. He had to anticipate user needs through product understanding rather than feedback loops.

Lesson: When feedback loops don't exist, seek engagement proactively. He started joining weekly drop-in calls to interact directly with active developers. Proactive engagement beats waiting for feedback that may never come.

**The Over-Detailed API Reference (2019)**
He documented every edge case and parameter variation so thoroughly that developers couldn't find the basic getting-started information they needed. Comprehensive became overwhelming.

Lesson: Good documentation has layers. Lead with common cases, put edge cases in expandable sections or appendices.

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
      { requirement: "Technical depth", evidence: "Built production AI chatbot solo. Documented blockchain smart contracts, cryptographic operations, typed protocols. Read codebases, write Python/JavaScript." }
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
      { requirement: "Software engineering role", reality: "I'm a technical writer who builds, not a software engineer. I shipped an AI chatbot and documentation tooling, but I'm not going to architect your distributed systems." },
      { requirement: "Deep ML/AI expertise", reality: "I built one production AI chatbot and learned a lot, but it's one project — not years of ML/AI engineering." },
      { requirement: "People management", reality: "I've owned documentation strategy and led projects, but I haven't managed a team of writers. If you need a people manager, that's not me yet." },
      { requirement: "Product management", reality: "I think strategically about documentation as a product, but I haven't owned product roadmaps or P&L." }
    ],
    whatTransfers: "Documentation ownership transfers. Strategic thinking transfers. Information architecture skills transfer. The ability to own and ship projects independently transfers.",
    recommendation: "If you have documentation leadership roles that need someone who can own strategy, design architecture, and build infrastructure, I'm interested. But for this specific position, I don't think I'm your person."
  }
};
