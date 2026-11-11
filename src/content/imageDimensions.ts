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
  'what-did-the-score-mean': { width: 1920, height: 1280 },
  'who-authorized-the-agent': { width: 1248, height: 832 },
  'october-2026-model-releases': { width: 1920, height: 1280 },
};

/** Article body images, keyed by exact markdown `src`. */
export const ARTICLE_IMAGE_DIMS: Record<string, ImageDims> = {
  '/images/The%20Sounding%20Line.jpg': { width: 1280, height: 1920 },
  '/images/The%20New%20Datum.jpg': { width: 1280, height: 1920 },
  '/images/The%20Letter%20of%20Passage.jpg': { width: 1280, height: 1920 },
  '/images/The%20Countersignature.jpg': { width: 1296, height: 1952 },
  '/images/The%20Loud%20Month.jpg': { width: 1120, height: 2240 },
  '/images/The%20Receipts%20Desk.jpg': { width: 1120, height: 2240 },
  '/images/The%20Faint%20Light.jpg': { width: 2384, height: 1008 },
  '/images/The%20Library%20of%20Brains.jpg': { width: 2384, height: 1008 },
  '/images/deepseek-deepinfer-lead.jpg': { width: 1672, height: 941 },
  '/images/deepseek-deepinfer-economics.jpg': { width: 1672, height: 941 },
  '/images/php2shell-lead.jpg': { width: 1152, height: 768 },
  '/images/quiet-listing.png': { width: 1152, height: 768 },
  '/images/rag-vs-maintained-wiki-lead.jpg': { width: 2752, height: 1536 },
  '/images/rag-vs-maintained-wiki-correction.png': { width: 2528, height: 1696 },
  '/images/rag-vs-maintained-wiki-contradiction.png': { width: 2528, height: 1696 },
  '/images/recursive-flint-laptop-coding-model-lead.png': { width: 1152, height: 768 },
  '/images/recursive-flint-laptop-coding-model-oversight.png': { width: 2752, height: 1536 },
};
