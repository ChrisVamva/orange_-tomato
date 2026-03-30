export interface WatchdogEntry {
  id: string;
  name: string;
  category: string;
  disruption: string;
  tomatoScore: number;
  status: string;
  techDNA: string[];
  description: string;
  founded: string;
  lastUpdated: string;
}

export const watchdogEntries: WatchdogEntry[] = [
  {
    "id": "browser-use-026",
    "name": "Browser-use",
    "category": "logic",
    "disruption": "Total displacement of selector-based Selenium/Playwright suites.",
    "tomatoScore": 9,
    "status": "active",
    "techDNA": [
      "open-source",
      "vision-native"
    ],
    "description": "The state-of-the-art framework for agent-native web interaction.",
    "founded": "2024",
    "lastUpdated": "2026-03-30"
  }
];

export const aiObservations = [
  "The shift from DOM-parsing to Vision-loops is the primary driver of the 2026 Headless Economy.",
  "Self-hosting local inference models is now a prerequisite for data-sovereign automation."
];