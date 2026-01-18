// Joseph Fajen's profile data - the core content for the AI and display

export const josephProfile = {
  name: "Joseph Fajen",
  title: "Senior Technical Writer",
  subtitle: "Technical writer who builds — AI chatbots, documentation systems, and developer tools",
  location: "Portland, OR",
  status: "Seeking Senior Technical Writer or Documentation Lead roles",

  // Differentiator: Lead with what makes him unique
  positioning: "I don't just write about technology — I build with it. Most recently shipped a production AI chatbot solo. Looking for roles where technical depth and strategic thinking matter.",

  companies: ["IOHK", "AJA Video Systems", "Ensemble Designs"],

  summary: `Technical writer who ships software. 20+ years turning complex systems into clear documentation.
Recently built a production AI chatbot end-to-end: 2,500 documents, zero hallucination, deployed and running.
I work best on documentation challenges that require real technical depth and strategic ownership.`,

  // Featured project elevated from experience highlights
  featuredProject: {
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
    why: "This project demonstrates I can own and ship a complete software product, not just write docs about one."
  },

  experience: [
    {
      company: "IOHK",
      role: "Senior Technical Writer",
      period: "2022–Present",
      highlights: [
        "Built Essential Cardano AI Assistant Chatbot end-to-end — 2,500 documents, zero hallucination",
        "Created unified documentation site for Marlowe smart contract project using Docusaurus",
        "Led comprehensive reorganization of Plutus documentation, migrating from Read the Docs to Docusaurus"
      ],
      aiContext: {
        situation: "Cardano blockchain documentation was fragmented across multiple repositories with inconsistent formats and outdated content.",
        approach: "Consolidated documentation into unified sites, implemented docs-as-code workflows, and coordinated across development, web, communications, and design teams.",
        technicalWork: "Built production AI chatbot with Next.js, created extraction pipeline for 2,500 documents from 8 sources, deployed on Railway infrastructure. Designed Docusaurus-based documentation sites with improved information architecture.",
        lessonsLearned: "Documentation unification is as much about stakeholder alignment as it is about content. Getting buy-in from multiple teams early prevents rework later."
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
    // Reframed to emphasize builder/technical differentiators
    strong: [
      "API & Developer Documentation",
      "Building Documentation Tools (Python, JavaScript)",
      "AI/LLM Application Development",
      "Docs-as-Code Workflows (Git, Markdown, CI/CD)",
      "Documentation Strategy & Information Architecture",
      "Docusaurus & Static Site Generators"
    ],
    moderate: [
      "Blockchain Technologies (Cardano, smart contracts)",
      "Video Signal Processing",
      "Technical Project Leadership",
      "System Design for Documentation"
    ],
    gaps: [
      "Deep Software Engineering (not an SWE, but code-literate)",
      "DevOps & Infrastructure",
      "People Management (have led projects, not teams)"
    ]
  },

  failures: [
    {
      year: 2023,
      title: "The Documentation Migration That Stalled",
      summary: "Led a documentation migration that hit unexpected organizational resistance.",
      details: "I underestimated how attached teams were to their existing documentation locations. Even with a better unified structure, getting everyone to update their links and workflows took longer than the technical migration itself.",
      lessons: "Technical improvements need social buy-in. Spend more time upfront getting stakeholder commitment before starting migrations."
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
  default: `Here's what makes Joseph different from most technical writers: he ships software.

Most recently, he built a production AI chatbot solo — 2,500 documents, zero hallucination, currently running in production. That's not "I wrote docs about AI," that's "I architected and deployed an AI application."

He has 20+ years of technical writing experience, but his differentiator is technical depth. He reads codebases, writes Python and JavaScript, and can go deep with engineers as a peer rather than just interviewing them for content.

If you're looking for someone who can own documentation strategy and build the tools to support it, he's a strong fit. If you need a pure software engineer or product manager, that's not his background — but he's more technical than most writers you'll meet.

What specific aspect would you like to dig into?`,

  aiProject: `The Essential Cardano AI Assistant was a solo project from architecture to deployment. Here's the technical breakdown:

• Extracted 2,500 documents from 8 different sources (GitHub repos, wikis, websites)
• Built a complete ingestion pipeline in Python
• Developed a Next.js frontend with streaming responses and conversation persistence
• Iterated through 20+ system prompt versions to achieve zero detectable hallucination
• Deployed on Railway infrastructure — 91 commits, full project lifecycle

The hardest part wasn't the code — it was prompt engineering. Getting an LLM to accurately represent blockchain documentation without hallucinating required extensive testing and iteration.

This demonstrates he can own a complete software product, not just write about one. But to be clear: this is one substantial project, not years of ML/AI engineering. He's a technical writer who builds, not an AI engineer who writes.`,

  technicalDepth: `Yes, Joseph is technical enough to work directly with engineers — and that's a key differentiator.

He reads codebases to understand how systems actually work, not just what engineers tell him. He writes Python and JavaScript for documentation tooling. He built a production AI chatbot from scratch, handling everything from data extraction to deployment.

At AJA Video Systems, he created the first comprehensive REST API documentation by diving into the codebase when the information wasn't documented anywhere else. Engineers often don't realize what's undocumented until someone technical enough starts asking the right questions.

That said, he's not a software engineer. He won't be architecting your distributed systems or optimizing your database queries. He's a technical writer who can hold his own in technical discussions and build tools to support documentation — that's the sweet spot.`,

  failure: `Joseph documented two failures he's willing to discuss openly:

**The Documentation Migration That Stalled (2023)**
He led a documentation migration that hit unexpected organizational resistance. The technical work was solid, but he underestimated how attached teams were to their existing documentation locations. Getting everyone to update their links and workflows took longer than the migration itself.

Lesson: Technical improvements need social buy-in. He now spends more time upfront getting stakeholder commitment before starting migrations.

**The Over-Detailed API Reference (2019)**
He documented every edge case and parameter variation so thoroughly that developers couldn't find the basic getting-started information they needed. Comprehensive became overwhelming.

Lesson: Good documentation has layers. Lead with common cases, put edge cases in expandable sections or appendices.

He shares these because honesty about failures is more useful than a polished highlight reel.`,

  leadershipReady: `There's a meaningful difference, and Joseph sits in an interesting spot.

A technical writer executes: takes assignments, interviews engineers, produces documentation. A documentation lead owns strategy: decides what to document, how to structure information architecture, what tools to use, how to measure success.

Joseph has done both. At IOHK, he didn't just write docs — he led the migration from Read the Docs to Docusaurus, unified fragmented documentation across multiple repositories, and made architectural decisions about information structure. He's driven documentation strategy across multiple teams.

What he hasn't done is manage people directly. He's led projects and driven decisions, but hasn't had direct reports. If you need someone who can own documentation strategy as a senior IC or lead without people management, that's his sweet spot. If you need someone who's managed a team of writers, that's a gap.`
};

export const fitAssessments = {
  strong: {
    verdict: "strong" as const,
    title: "Strong Fit — Let's Talk",
    summary: "Your requirements align well with my experience. Here's the specific evidence:",
    matches: [
      { requirement: "Technical depth", evidence: "Built a production AI chatbot solo. Read codebases, write Python/JavaScript, can go deep with engineers as a peer." },
      { requirement: "Documentation strategy ownership", evidence: "Led documentation unification at IOHK, made architectural decisions about information structure, drove migrations across multiple teams." },
      { requirement: "API & developer documentation", evidence: "Created first comprehensive REST API documentation at AJA Video Systems. Built developer documentation for blockchain smart contracts at IOHK." },
      { requirement: "Docs-as-code workflows", evidence: "Led migrations to Docusaurus, work in Git/GitHub daily, build tooling in Python and JavaScript." }
    ],
    gaps: [
      { area: "People management", note: "I've led projects and driven decisions, but haven't had direct reports. I'm a senior IC, not a people manager." }
    ],
    recommendation: "I'd be genuinely useful here. I can own documentation strategy, build the tools to support it, and work directly with engineers. That combination is rare."
  },
  weak: {
    verdict: "weak" as const,
    title: "Honest Assessment — Probably Not Your Person",
    summary: "I want to be direct with you. Here's why this might not be the right fit:",
    mismatches: [
      { requirement: "Software engineering role", reality: "I'm a technical writer who builds, not a software engineer. I shipped an AI chatbot, but I'm not going to architect your distributed systems." },
      { requirement: "Deep ML/AI expertise", reality: "I built one production AI chatbot and learned a lot, but it's one project — not years of ML/AI engineering." },
      { requirement: "People management", reality: "I've led projects and documentation strategy, but I haven't managed a team of writers. If you need a people manager, that's not me." },
      { requirement: "Product management", reality: "I think strategically about documentation as a product, but I haven't owned product roadmaps or P&L." }
    ],
    whatTransfers: "Technical depth transfers. Strategic thinking transfers. The ability to own and ship projects independently transfers.",
    recommendation: "If you have technical writing or documentation lead roles that need someone who can build and think strategically, I'm interested. But for this specific position, I don't think I'm your person."
  }
};
