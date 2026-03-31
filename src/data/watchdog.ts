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
