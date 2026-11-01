// Rehype plugin for article tables. Presentation only: it never changes cell text.
// 1. Wraps every table in a scrollable, keyboard-focusable container.
// 2. Header-driven enhancements for numeric columns:
//    - header contains "solved"        -> value shown in a heat chip (relative to the column max)
//    - header contains "$" or "cost"   -> value gets an inline bar (sqrt-scaled to the column max)
//    Tables whose headers match neither (e.g. text-heavy tables) only get the base style.

interface HNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HNode[];
  value?: string;
}

const isEl = (n: HNode, tag: string) => n.type === 'element' && n.tagName === tag;

const textOf = (n: HNode): string =>
  n.type === 'text' ? (n.value ?? '') : (n.children ?? []).map(textOf).join('');

const elements = (n: HNode, tag: string): HNode[] =>
  (n.children ?? []).filter((c) => isEl(c, tag));

const el = (
  tagName: string,
  properties: Record<string, unknown>,
  children: HNode[],
): HNode => ({ type: 'element', tagName, properties, children });

const addClass = (n: HNode, cls: string) => {
  const props = (n.properties ??= {});
  const existing = Array.isArray(props.className) ? (props.className as string[]) : [];
  props.className = [...existing, cls];
};

type Kind = 'heat' | 'bar';

const kindOf = (header: string): Kind | null => {
  const h = header.toLowerCase();
  if (h.includes('$') || h.includes('cost')) return 'bar';
  if (h.includes('solved')) return 'heat';
  return null;
};

const toNumber = (s: string): number => Number.parseFloat(s.replace(/[^0-9.]/g, ''));

const enhanceColumns = (table: HNode): boolean => {
  const thead = elements(table, 'thead')[0];
  const tbody = elements(table, 'tbody')[0];
  if (!thead || !tbody) return false;

  const headerRow = elements(thead, 'tr')[0];
  if (!headerRow) return false;
  const kinds = elements(headerRow, 'th').map((th) => kindOf(textOf(th)));
  const rows = elements(tbody, 'tr');
  let enhanced = false;

  kinds.forEach((kind, col) => {
    if (!kind) return;
    const cells = rows.map((r) => elements(r, 'td')[col]);
    const values = cells.map((c) => (c ? toNumber(textOf(c)) : Number.NaN));
    if (values.length === 0 || values.some((v) => !Number.isFinite(v))) return;
    const max = Math.max(...values);
    if (max <= 0) return;

    cells.forEach((cell, i) => {
      if (!cell) return;
      const original = cell.children ?? [];
      addClass(cell, 'ot-num');
      if (kind === 'heat') {
        const ratio = values[i] / max;
        const tier = ratio >= 0.8 ? 'hi' : ratio >= 0.4 ? 'mid' : 'lo';
        cell.children = [el('span', { className: ['ot-chip', `ot-chip--${tier}`] }, original)];
      } else {
        const width = Math.round(Math.sqrt(values[i] / max) * 100);
        cell.children = [
          el('div', { className: ['ot-bar'] }, [
            el('span', { className: ['ot-bar-fill'], style: `--w:${width}`, ariaHidden: 'true' }, []),
            el('span', { className: ['ot-bar-val'] }, original),
          ]),
        ];
      }
    });
    enhanced = true;
  });

  return enhanced;
};

const walk = (node: HNode) => {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (isEl(child, 'table')) {
      addClass(child, 'ot-table');
      const data = enhanceColumns(child);
      return el(
        'div',
        {
          className: data ? ['ot-table-wrap', 'ot-data'] : ['ot-table-wrap'],
          tabIndex: 0,
          role: 'region',
          ariaLabel: 'Scrollable table',
        },
        [child],
      );
    }
    walk(child);
    return child;
  });
};

export const rehypeTableStyle = () => (tree: HNode) => {
  walk(tree);
};

