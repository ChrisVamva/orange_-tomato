export interface WatchdogEntry {
  id: string;
  name: string;
  category: string;
  disruption: string;
  tomatoScore: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical' | 'emerging'; // Required by UI
  status: 'active' | 'monitoring' | 'declining' | 'emerging';
  techDNA: string[];
  description: string;
  founded: string;
  marketCap?: string; // Required by UI
  lastUpdated: string;
}

export const watchdogEntries: WatchdogEntry[] = [
  {
    "id": "browser-use-026",
    "name": "Browser-use",
    "category": "browser",
    "disruption": "Total displacement of selector-based automation.",
    "tomatoScore": 9,
    "threatLevel": "critical",
    "status": "active",
    "techDNA": ["vision-native", "agentic-orchestration", "playwright-killer"],
    "description": "The state-of-the-art framework for agent-native web interaction using vision-loops.",
    "founded": "2024",
    "marketCap": "N/A (Open Source)",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "skyvern-001",
    "name": "Skyvern",
    "category": "automation",
    "disruption": "Eliminates custom automation scripts via LLM navigation.",
    "tomatoScore": 9,
    "threatLevel": "high",
    "status": "active",
    "techDNA": ["open-source", "llm-navigation", "vision-native"],
    "description": "Open-source workflow automation utilizing LLMs to navigate web interfaces dynamically without fragile selectors.",
    "founded": "2023",
    "marketCap": "N/A",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "agentql-002",
    "name": "AgentQL",
    "category": "query",
    "disruption": "Abstracts away raw DOM structures.",
    "tomatoScore": 6,
    "threatLevel": "medium",
    "status": "active",
    "techDNA": ["semantic-querying", "dom-abstraction"],
    "description": "Semantic query language for web scraping and automation, replacing brittle XPath and CSS selectors.",
    "founded": "2023",
    "marketCap": "N/A",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "browserbase-003",
    "name": "Browserbase",
    "category": "infrastructure",
    "disruption": "Commoditizes headless browser infrastructure for AI.",
    "tomatoScore": 7,
    "threatLevel": "high",
    "status": "active",
    "techDNA": ["headless-browser", "api-first", "agent-infra"],
    "description": "Reliable, scalable headless browser infrastructure built specifically for AI agents and automated workflows.",
    "founded": "2023",
    "marketCap": "N/A",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "lavague-004",
    "name": "LaVague",
    "category": "framework",
    "disruption": "Democratizes Large Action Models for web automation.",
    "tomatoScore": 9,
    "threatLevel": "emerging",
    "status": "active",
    "techDNA": ["lam", "open-source", "nlp-to-action"],
    "description": "Open-source Large Action Model framework transforming natural language into executable web automation actions.",
    "founded": "2024",
    "marketCap": "N/A",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "multion-005",
    "name": "MultiOn",
    "category": "agent",
    "disruption": "Brings autonomous, API-driven web agents to consumer tasks.",
    "tomatoScore": 6,
    "threatLevel": "high",
    "status": "active",
    "techDNA": ["autonomous-agent", "api-first", "browser-extension"],
    "description": "Autonomous AI agent for the web executing complex tasks via an API-first interface.",
    "founded": "2023",
    "marketCap": "N/A",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "induced-ai-006",
    "name": "Induced AI",
    "category": "automation",
    "disruption": "Scales complex cloud-native browser workflows for agents.",
    "tomatoScore": 6,
    "threatLevel": "medium",
    "status": "monitoring",
    "techDNA": ["cloud-browser", "api-first", "isolated-environments"],
    "description": "Cloud-native browser automation platform letting AI agents perform complex workflows in isolated environments.",
    "founded": "2023",
    "marketCap": "N/A",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "openoperator-007",
    "name": "OpenOperator",
    "category": "framework",
    "disruption": "Standardizes browser agent evaluation and execution.",
    "tomatoScore": 8,
    "threatLevel": "emerging",
    "status": "active",
    "techDNA": ["open-standard", "evaluation", "framework"],
    "description": "Open standard and framework for evaluating and running browser agents effectively across platforms.",
    "founded": "2024",
    "marketCap": "N/A",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "stagehand-008",
    "name": "Stagehand",
    "category": "framework",
    "disruption": "Bridges traditional automation with AI capabilities.",
    "tomatoScore": 8,
    "threatLevel": "high",
    "status": "active",
    "techDNA": ["playwright-wrapper", "ai-first", "open-source"],
    "description": "AI-first web automation framework extending Playwright to provide robust, semantic interactions.",
    "founded": "2024",
    "marketCap": "N/A",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "tarsier-009",
    "name": "Tarsier",
    "category": "vision",
    "disruption": "Bypasses DOM entirely for pure visual interaction.",
    "tomatoScore": 9,
    "threatLevel": "emerging",
    "status": "active",
    "techDNA": ["vision-native", "dom-bypass", "open-source"],
    "description": "Vision-centric utility enabling LLMs to interact with web pages through visual understanding instead of DOM.",
    "founded": "2024",
    "marketCap": "N/A",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "steel-010",
    "name": "Steel",
    "category": "infrastructure",
    "disruption": "Open-sources dedicated AI browser environments.",
    "tomatoScore": 8,
    "threatLevel": "medium",
    "status": "active",
    "techDNA": ["open-source", "browser-infra", "api-first"],
    "description": "Open-source browser infrastructure designed specifically to support AI agents and automated testing.",
    "founded": "2024",
    "marketCap": "N/A",
    "lastUpdated": "2026-03-30"
  }
,
  {
    "id": "roo-code-011",
    "name": "Roo Code",
    "category": "developer-agent",
    "disruption": "Seamlessly integrates advanced LLM capabilities into VS Code.",
    "tomatoScore": 8,
    "threatLevel": "high",
    "status": "active",
    "techDNA": ["vs-code-extension", "agentic-coding", "llm-integration"],
    "description": "An open-source, highly capable AI coding assistant that operates directly within VS Code, capable of executing complex multi-file edits.",
    "founded": "2024",
    "marketCap": "N/A (Open Source)",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "cline-012",
    "name": "Cline",
    "category": "developer-agent",
    "disruption": "Provides a CLI-first autonomous agent for sophisticated codebase manipulation.",
    "tomatoScore": 9,
    "threatLevel": "critical",
    "status": "active",
    "techDNA": ["cli-first", "autonomous-agent", "codebase-manipulation"],
    "description": "A powerful command-line agent that leverages LLMs to autonomously write, edit, and debug code across entire projects.",
    "founded": "2024",
    "marketCap": "N/A (Open Source)",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "openhands-013",
    "name": "OpenHands",
    "category": "developer-agent",
    "disruption": "Open-source alternative to proprietary SWE agents.",
    "tomatoScore": 9,
    "threatLevel": "critical",
    "status": "active",
    "techDNA": ["open-source", "swe-agent", "docker-sandboxed"],
    "description": "An open-source platform for autonomous software engineering agents, enabling them to write code, run tests, and fix bugs in secure sandboxes.",
    "founded": "2024",
    "marketCap": "N/A (Open Source)",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "devin-014",
    "name": "Devin",
    "category": "developer-agent",
    "disruption": "First autonomous AI software engineer capable of full lifecycle development.",
    "tomatoScore": 10,
    "threatLevel": "critical",
    "status": "active",
    "techDNA": ["proprietary", "autonomous-swe", "full-lifecycle"],
    "description": "The world's first fully autonomous AI software engineer, capable of planning, executing, and debugging complex engineering tasks end-to-end.",
    "founded": "2023",
    "marketCap": "Private",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "plandex-015",
    "name": "Plandex",
    "category": "developer-agent",
    "disruption": "Brings complex, multi-file task planning to the terminal.",
    "tomatoScore": 7,
    "threatLevel": "medium",
    "status": "active",
    "techDNA": ["terminal-native", "task-planning", "multi-file"],
    "description": "An AI coding engine for the terminal that handles complex, multi-file tasks by meticulously planning and executing changes.",
    "founded": "2024",
    "marketCap": "N/A (Open Source)",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "bolt-new-016",
    "name": "Bolt.new",
    "category": "developer-agent",
    "disruption": "Enables instant, browser-based full-stack web app generation.",
    "tomatoScore": 8,
    "threatLevel": "high",
    "status": "active",
    "techDNA": ["web-based", "full-stack-generation", "instant-deployment"],
    "description": "An AI-powered web development environment that allows users to prompt, generate, and deploy full-stack applications entirely in the browser.",
    "founded": "2024",
    "marketCap": "Private",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "lovable-017",
    "name": "Lovable",
    "category": "developer-agent",
    "disruption": "Abstracts frontend development into high-level conversational prompts.",
    "tomatoScore": 7,
    "threatLevel": "high",
    "status": "emerging",
    "techDNA": ["conversational-ui", "frontend-generation", "react-native"],
    "description": "A conversational AI developer designed to build and iterate on production-ready software based purely on natural language interaction.",
    "founded": "2024",
    "marketCap": "Private",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "replit-agent-018",
    "name": "Replit Agent",
    "category": "developer-agent",
    "disruption": "Democratizes software creation within an integrated cloud IDE.",
    "tomatoScore": 9,
    "threatLevel": "critical",
    "status": "active",
    "techDNA": ["cloud-ide", "integrated-agent", "zero-to-prod"],
    "description": "An integrated AI agent within Replit that can build, configure, and deploy entire applications from a single prompt.",
    "founded": "2024",
    "marketCap": "Private",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "windsurf-019",
    "name": "Windsurf",
    "category": "developer-agent",
    "disruption": "Provides a highly contextual, AI-first IDE experience.",
    "tomatoScore": 8,
    "threatLevel": "high",
    "status": "active",
    "techDNA": ["ai-ide", "deep-context", "flow-state"],
    "description": "An AI-first IDE that maintains deep context of the codebase and developer intent, enabling seamless collaboration between human and agent.",
    "founded": "2024",
    "marketCap": "Private",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "trae-020",
    "name": "Trae",
    "category": "developer-agent",
    "disruption": "Accelerates enterprise development workflows with contextual AI.",
    "tomatoScore": 6,
    "threatLevel": "medium",
    "status": "emerging",
    "techDNA": ["enterprise-focus", "contextual-ai", "workflow-acceleration"],
    "description": "An adaptive AI developer tool designed to integrate deeply into enterprise workflows, boosting productivity through contextual understanding.",
    "founded": "2024",
    "marketCap": "Private",
    "lastUpdated": "2026-03-30"
  },
  {
    "id": "supermaven-021",
    "name": "Supermaven",
    "category": "developer-agent",
    "disruption": "Delivers ultra-low latency, massive-context code completion.",
    "tomatoScore": 8,
    "threatLevel": "high",
    "status": "active",
    "techDNA": ["massive-context", "low-latency", "code-completion"],
    "description": "A high-performance AI copilot utilizing a massive context window to provide instantaneous, highly accurate code completions across large codebases.",
    "founded": "2024",
    "marketCap": "Private",
    "lastUpdated": "2026-03-30"
  }

];

export const aiObservations = [
  {
    id: "obs-001",
    title: "The Vision Shift",
    summary: "DOM-based scraping is dead. Vision-loops are the new standard.",
    patterns: ["Accessibility-tree reasoning", "Visual-spatial awareness"],
    confidence: 0.98
  }
];

export const latestIntelligence = [
  {
    id: 'int-001',
    title: 'The Death of the Selector',
    snippet: 'Why XPath and CSS selectors are becoming obsolete in the age of agent-native automation and vision-based proxies.',
    author: 'Jules',
    date: '2026-03-31',
    tags: ['ARCHITECTURE', 'VISION']
  },
  {
    id: 'int-002',
    title: 'Headless Browser Monopolies',
    snippet: 'Examining the emerging infrastructure war between cloud-native providers hosting isolated evaluation environments.',
    author: 'Jules',
    date: '2026-03-29',
    tags: ['INFRASTRUCTURE', 'CLOUD']
  },
  {
    id: 'int-003',
    title: 'Standardizing Large Action Models',
    snippet: 'The race to create an open standard for LAM evaluation across different operating theaters and browser protocols.',
    author: 'Jules',
    date: '2026-03-25',
    tags: ['OPEN-SOURCE', 'EVALUATION']
  }
];
