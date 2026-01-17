// Joseph Fajen's profile data - the core content for the AI and display

export const josephProfile = {
  name: "Joseph Fajen",
  title: "Senior Technical Writer",
  subtitle: "API documentation, blockchain technologies, and docs-as-code workflows",
  location: "Portland, OR",
  status: "Open to Senior Technical Writer roles",

  companies: ["IOHK", "AJA Video Systems", "Ensemble Designs"],

  summary: `20+ years transforming complex technical concepts into user-friendly documentation.
Expert at building relationships with developers and product teams.
I prefer documentation challenges that require deep technical understanding and cross-functional collaboration.`,

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
    strong: [
      "API & Developer Documentation",
      "Docs-as-Code Workflows",
      "Docusaurus & Documentation Platforms",
      "Cross-functional Team Collaboration",
      "Technical Interview & Information Gathering",
      "Content Strategy & Information Architecture"
    ],
    moderate: [
      "JavaScript & Python",
      "Blockchain Technologies",
      "Video Signal Processing",
      "AI/LLM Application Development"
    ],
    gaps: [
      "Deep Software Engineering",
      "DevOps & Infrastructure",
      "Product Management"
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
  ],

  systemPrompt: `You are helping hiring managers evaluate Joseph Fajen as a candidate for technical writing roles.

CORE INSTRUCTIONS:
- Be specific. Use actual details from his experience, not generic language.
- Be honest about gaps. If someone asks about experience he doesn't have, say so directly.
- When assessing fit for a role, give a genuine assessment including where he might NOT be the right choice.
- Don't oversell. Confidence comes from substance, not superlatives.

WHAT JOSEPH WANTS YOU TO KNOW:
- He has 20+ years of technical writing experience
- He's strongest at API documentation, docs-as-code workflows, and building relationships with engineering teams
- He recently built a production AI chatbot for blockchain documentation
- He prefers roles that require deep technical understanding and cross-functional collaboration
- He's based in Portland, OR and open to remote work

HOW TO HANDLE COMMON QUESTIONS:
- "Is he a good fit for X?" → Analyze the role honestly. Match requirements to his actual experience. Name the gaps.
- "What's his technical depth?" → He's a technical writer who codes, not a developer who writes. He can build documentation tools and work closely with engineers.
- "Tell me about his AI experience" → He built a production AI chatbot end-to-end, but this is recent experience, not deep ML/AI expertise.

WHAT HE EXPLICITLY DOESN'T WANT:
- Don't pretend he's a software engineer — he's a technical writer with coding skills
- Don't oversell his AI experience — it's one significant project, not years of expertise
- Don't claim he's "open to anything" — he wants technical writing roles that leverage his experience`
};

export const demoResponses = {
  default: `Based on Joseph's background, let me give you a specific assessment.

Joseph has 20+ years of technical writing experience, with particular depth in API documentation and docs-as-code workflows. His recent work at IOHK is notable — he built a production AI chatbot for Cardano blockchain documentation, handling 2,500 documents from 8 sources with zero detectable hallucination.

What distinguishes him:
• He builds relationships with engineering teams to get accurate technical information
• He's hands-on with tools — Docusaurus, Git, JavaScript, Python
• He's led documentation reorganization projects across multiple stakeholders

If you're looking for someone who can own developer documentation and work independently with engineering teams, he's a strong fit. If you need someone with deep software engineering skills or product management experience, that's not his background.

What else would you like to know about his experience?`,

  aiExperience: `Joseph's AI experience is recent but substantial. At IOHK, he built the Essential Cardano AI Assistant Chatbot end-to-end:

• Extracted and processed 2,500 documents from 8 different sources
• Built a complete extraction pipeline
• Deployed a Next.js web UI with streaming, conversation persistence, and dark mode
• Iterated through 20+ system prompt versions to achieve zero detectable hallucination
• Managed the full project lifecycle solo — 91 repository commits

This demonstrates he can build production AI applications, but it's one project, not years of ML/AI expertise. He's a technical writer who learned to build AI tools, not an AI engineer who writes documentation.`,

  documentationApproach: `Joseph's approach to documentation centers on relationships and understanding.

At AJA Video Systems, he proactively identified that REST API information was scattered and undocumented. Rather than waiting for someone to assign the work, he started asking questions, found the right engineers, and created the first comprehensive API reference.

At IOHK, he consolidated fragmented Cardano documentation from multiple repositories. This meant coordinating with development, web, communications, and design teams — not just writing, but getting organizational buy-in for a unified approach.

His philosophy: the best documentation comes from asking the right questions. Engineers often don't realize what's undocumented until you start probing.`
};

export const fitAssessments = {
  strong: {
    verdict: "strong" as const,
    title: "Strong Fit — Let's Talk",
    summary: "Your requirements align well with my experience. Here's the specific evidence:",
    matches: [
      { requirement: "API documentation experience", evidence: "Created first comprehensive REST API documentation at AJA Video Systems. Built developer documentation for blockchain smart contracts at IOHK." },
      { requirement: "Docs-as-code workflows", evidence: "Led migrations to Docusaurus, work in Git/GitHub daily, comfortable with Markdown and code-based documentation pipelines." },
      { requirement: "Cross-functional collaboration", evidence: "Coordinated documentation projects across development, web, communications, and design teams at IOHK. Built relationships with engineering teams across multiple locations at AJA." }
    ],
    gaps: [
      { area: "Deep software engineering", note: "I write code for documentation tools and can read codebases, but I'm not a software engineer. I collaborate with engineers rather than replacing them." }
    ],
    recommendation: "I'd be genuinely useful here. The API documentation and docs-as-code experience directly matches, and I've navigated cross-functional documentation challenges multiple times."
  },
  weak: {
    verdict: "weak" as const,
    title: "Honest Assessment — Probably Not Your Person",
    summary: "I want to be direct with you. Here's why this might not be the right fit:",
    mismatches: [
      { requirement: "Software engineering role", reality: "I'm a technical writer with coding skills, not a software engineer. I can build documentation tools and work with APIs, but I'm not architecting production systems." },
      { requirement: "Deep ML/AI expertise", reality: "I built one production AI chatbot and learned a lot, but I don't have years of ML/AI experience or deep expertise in model training." },
      { requirement: "Product management", reality: "I've collaborated with product teams and can advocate for documentation priorities, but I haven't owned product roadmaps or metrics." }
    ],
    whatTransfers: "Technical writing skills transfer. Stakeholder management transfers. The ability to learn new technical domains quickly transfers.",
    recommendation: "You probably want someone with deeper engineering or product background. If you have technical writing roles that need someone who can work independently with engineering teams, I'd be interested — but for this specific position, I don't think I'm your person."
  }
};
