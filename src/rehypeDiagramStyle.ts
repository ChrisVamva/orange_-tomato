// Rehype plugin for article diagrams. Presentation only: it never changes text.
//
// A notebook diagram is authored at a fixed design width (960px) so its type is legible at
// that size. Rendered inside the article column on a phone it shrank to ~35%, which made the
// labels unreadable. This wraps a standalone diagram image (an <img> whose src ends in .svg,
// alone in its paragraph) in a horizontally scrollable, keyboard-focusable container, and the
// stylesheet keeps the artwork at its design width below 1024px so it can be panned instead of
// shrunk. Above that width nothing changes: the image fills the column as before.
//
// Mirrors rehypeTableStyle, which does the same job for wide tables.

interface HNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HNode[];
  value?: string;
}

const isEl = (n: HNode, tag: string) => n.type === 'element' && n.tagName === tag;

const isDiagramImage = (n: HNode): boolean => {
  if (!isEl(n, 'img')) return false;
  const src = String((n.properties?.src as string | undefined) ?? '');
  return /\.svg($|\?)/i.test(src);
};

// A paragraph counts as a diagram paragraph when its only element child is one SVG image.
const isDiagramParagraph = (n: HNode): boolean => {
  if (!isEl(n, 'p')) return false;
  const kids = (n.children ?? []).filter((c) => c.type === 'element' || (c.type === 'text' && (c.value ?? '').trim() !== ''));
  return kids.length === 1 && isDiagramImage(kids[0]);
};

const walk = (node: HNode) => {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (isDiagramParagraph(child)) {
      return {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['ot-diagram-wrap'],
          tabIndex: 0,
          role: 'region',
          ariaLabel: 'Scrollable diagram',
        },
        children: [child],
      };
    }
    walk(child);
    return child;
  });
};

export const rehypeDiagramStyle = () => (tree: HNode) => {
  walk(tree);
};
