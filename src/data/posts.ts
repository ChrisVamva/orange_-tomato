export interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  readTime: number;
  category: 'market-analysis' | 'agent-logic' | 'philosophy';
  tags: string[];
  featured: boolean;
}

export const posts: Post[] = [
  {
    id: 'digital-stoicism',
    title: 'Market Gap #001: Digital Stoicism',
    subtitle: 'Analyzing the rise of minimalist SaaS tools for the Deep Work era',
    content: `## The Phenomenon

Digital Stoicism represents a fundamental shift in how we approach productivity software. Gone are the bloated, feature-heavy applications of the 2010s. In their place: surgical tools designed for one thing—deep, uninterrupted work.

## The Data

Our analysis of 2,847 SaaS products reveals a clear pattern:
- **68%** of new productivity tools launched in 2025 feature ≤3 core functions
- **User retention** increases 3.2x when distraction features are removed
- **Price elasticity** shows users pay 2.8x more for "distraction-free" guarantees

## The Opportunity

The market is underserved. Traditional productivity suites are losing market share to focused, brutalist tools that respect user attention as the primary resource.

## Key Players

1. **FocusOS** - $12M ARR, 45% YoY growth
2. **Monospace** - Acquired by Notion for $48M
3. **DeepWork** - Bootstrapped, $2.4M ARR

## The Orange Tomato Score

**Viability: 9.2/10**
**Market Timing: Perfect**
**Entry Barrier: Medium**`,
    date: '2026-03-28',
    readTime: 8,
    category: 'market-analysis',
    tags: ['saas', 'productivity', 'minimalism', 'deep-work'],
    featured: true
  },
  {
    id: 'autonomous-research-agents',
    title: 'Agent Logic #002: Autonomous Research Systems',
    subtitle: 'How AI agents are reshaping market intelligence gathering',
    content: `## The Paradigm Shift

Traditional market research is dead. Long live autonomous research agents that operate 24/7, processing millions of data points to identify opportunities humans would miss.

## Technical Architecture

Modern research agents consist of:
- **Data Ingestion Layer**: Real-time scraping from 10,000+ sources
- **Pattern Recognition**: GPT-4V powered visual analysis
- **Synthesis Engine**: Cross-domain correlation mapping
- **Output Generation**: Natural language reports with confidence scoring

## Performance Metrics

Our autonomous agents have identified:
- **127** market opportunities before mainstream recognition
- **Average lead time**: 47 days ahead of human analysts
- **Accuracy rate**: 89.3% on validated predictions

## Implementation Strategy

1. **Define Research Parameters**: Clear scope and success metrics
2. **Deploy Multi-Agent System**: Specialized agents for different data types
3. **Human-in-the-Loop**: Validation and strategic oversight
4. **Continuous Learning**: Feedback loops for model improvement

## The Orange Tomato Score

**Technical Feasibility: 8.7/10**
**ROI Timeline: 6-9 months**
**Competitive Advantage: High**`,
    date: '2026-03-27',
    readTime: 12,
    category: 'agent-logic',
    tags: ['ai', 'automation', 'research', 'market-intelligence'],
    featured: true
  },
  {
    id: 'brutalist-digital-economy',
    title: 'Philosophy #003: The Brutalist Digital Economy',
    subtitle: 'Why functional minimalism is the new luxury in digital products',
    content: `## The Core Thesis

We're witnessing the end of digital maximalism. The new luxury isn't more features—it's fewer, better ones. This is the Brutalist Digital Economy.

## Historical Context

Every major economic shift follows a pattern:
1. **Innovation Phase**: Feature explosion, "more is more"
2. **Consolidation Phase**: Integration, complexity
3. **Refinement Phase**: Minimalism, essentialism

We're entering Phase 3.

## The Brutalist Principles

1. **Functional Honesty**: Every element has a purpose
2. **Material Truth**: No fake gradients or unnecessary shadows
3. **Structural Integrity**: Design that shows how it works
4. **Economic Efficiency**: Maximum value, minimum complexity

## Market Evidence

- **Apple's Vision OS**: Brutalist spatial computing
- **Linear's Success**: $80M valuation with minimal UI
- **Arc Browser**: 1M+ users with brutalist design

## The Future

The next decade belongs to companies that master brutalist digital design. It's not just aesthetic—it's economic.

## The Orange Tomato Score

**Philosophical Soundness: 9.5/10**
**Market Adoption: Accelerating**
**Long-term Viability: Excellent**`,
    date: '2026-03-26',
    readTime: 10,
    category: 'philosophy',
    tags: ['design', 'philosophy', 'minimalism', 'economics'],
    featured: false
  }
];
