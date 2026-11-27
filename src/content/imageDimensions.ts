/**
 * Intrinsic dimensions for content images (P2: CLS fix).
 *
 * Measured 2026-11-11 from the delivered files in `public/` with PIL — never
 * guess or re-derive these from titles. Keys are the exact `src` strings as
 * written in `src/content/*.md` (URL-encoded) or the `FRONTLINE_SINGLES`
 * values in `articles.ts`.
 *
 * Vector diagrams (`public/diagrams/*.svg`) are intentionally absent: they
 * are CSS-sized inside `.ot-diagram-wrap` and scale from their viewBox.
 * Add a new record here whenever a new raster image ships.
 */

export interface ImageDims {
  width: number;
  height: number;
}

/** Frontline card images, keyed by article slug (matches FRONTLINE_SINGLES). */
export const FRONTLINE_DIMS: Record<string, ImageDims> = {
  'when-systems-fail': { width: 688, height: 459 },
  'what-the-agent-remembers': { width: 1536, height: 1024 },
  'what-did-the-score-mean': { width: 1920, height: 1280 },
  'who-authorized-the-agent': { width: 1248, height: 832 },
  'october-2026-model-releases': { width: 1920, height: 1280 },
};

/** Standard-post home-card covers, keyed by article slug. */
export const POST_COVER_DIMS: Record<string, ImageDims> = {
  'recursive-flint-laptop-coding-model': { width: 688, height: 459 },
  'deepseek-deepinfer-open-source': { width: 688, height: 459 },
  'openai-aurora-image-models': { width: 688, height: 459 },
};

/** Article body images, keyed by exact markdown `src`. */
export const ARTICLE_IMAGE_DIMS: Record<string, ImageDims> = {
  '/images/artwork/when-systems-fail-comic-1.webp': { width: 1200, height: 800 },
  '/images/artwork/when-systems-fail-comic-2.webp': { width: 1200, height: 800 },
  '/images/artwork/when-systems-fail-notebook-overview.webp': { width: 375, height: 4578 },
  '/images/artwork/recursive-flint-laptop-coding-model-lead.webp': { width: 1264, height: 846 },
  '/images/artwork/deepseek-deepinfer-open-source-lead.webp': { width: 1568, height: 1200 },
  '/images/artwork/openai-aurora-image-models-lead.webp': { width: 1000, height: 667 },
  '/images/The%20Sounding%20Line.jpg': { width: 1280, height: 1920 },
  '/images/The%20New%20Datum.jpg': { width: 1280, height: 1920 },
  '/images/who-authorized-the-agent-comic-1.webp': { width: 1536, height: 1024 },
  '/images/who-authorized-the-agent-comic-2.webp': { width: 1536, height: 1024 },
  '/images/The%20Loud%20Month.jpg': { width: 1120, height: 2240 },
  '/images/The%20Receipts%20Desk.jpg': { width: 1120, height: 2240 },
  '/images/What%20Is%20Kept.jpg': { width: 1200, height: 896 },
  '/images/What%20Keeping%20Costs.jpg': { width: 768, height: 1376 },
};
