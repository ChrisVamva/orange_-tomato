export interface WatchdogEntry {
  id: string;
  name: string;
  category: string;
  disruption: string;
  tomatoScore: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical'; // Required by UI
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