// Release layout check (added 2026-10-26, per the Preview Workspace and Release Protocol).
//
// Usage: node scripts/check-layout.mjs <url> [chromePath]
//
// Loads the page at a 390px mobile viewport through the DevTools protocol
// (Emulation.setDeviceMetricsOverride — `chrome --window-size` clips instead of
// reflowing and gives false readings), then reports two checks:
//   1. horizontal overflow: documentElement.scrollWidth vs clientWidth
//   2. article text contrast in dark mode: computed text colour vs effective
//      background, expressed as a WCAG contrast ratio
// Exit code 0 = both pass, 1 = at least one fails, 2 = tool error.

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const url = process.argv[2];
if (!url) {
  console.error('usage: node scripts/check-layout.mjs <url> [chromePath]');
  process.exit(2);
}
const chromeCandidates = [
  process.argv[3],
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].filter(Boolean);
const chromePath = chromeCandidates.find((p) => existsSync(p));
if (!chromePath) {
  console.error('chrome not found; pass its path as the second argument');
  process.exit(2);
}

const PORT = 9333;
const profile = mkdtempSync(join(tmpdir(), 'layout-check-'));
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  `--user-data-dir=${profile}`,
  `--remote-debugging-port=${PORT}`,
  'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getTarget() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch {
      // chrome not up yet
    }
    await sleep(200);
  }
  throw new Error('could not reach the DevTools endpoint');
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let nextId = 1;
    const pending = new Map();
    ws.onopen = () =>
      resolve({
        send(method, params = {}) {
          const id = nextId++;
          ws.send(JSON.stringify({ id, method, params }));
          return new Promise((res, rej) => {
            pending.set(id, { res, rej });
            setTimeout(() => {
              if (pending.has(id)) {
                pending.delete(id);
                rej(new Error(`timeout waiting for ${method}`));
              }
            }, 15000);
          });
        },
        close: () => ws.close(),
      });
    ws.onerror = (e) => reject(new Error(`websocket error: ${e.message || e.type}`));
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) rej(new Error(msg.error.message));
        else res(msg.result);
      }
    };
  });
}

let failed = false;
try {
  const target = await getTarget();
  const cdp = await connect(target.webSocketDebuggerUrl);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390, height: 844, deviceScaleFactor: 2, mobile: true,
  });
  await cdp.send('Page.navigate', { url });

  let ready = false;
  for (let i = 0; i < 75 && !ready; i++) {
    const r = await cdp.send('Runtime.evaluate', {
      expression: 'document.readyState', returnByValue: true,
    });
    ready = r.result.value === 'complete';
    if (!ready) await sleep(200);
  }
  await sleep(500); // let fonts/images settle layout

  // Force the real dark-mode state (html.dark + the article dark class), then
  // wait out the body background transition (0.3s) before measuring contrast.
  await cdp.send('Runtime.evaluate', {
    expression: `(() => {
      document.documentElement.classList.add('dark');
      const page = document.querySelector('.article-page') || document.body;
      page.classList.add('article-page-dark');
    })()`,
  });
  await sleep(600);

  const measure = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const de = document.documentElement;
      const scrollWidth = de.scrollWidth;
      const clientWidth = de.clientWidth;

      const sample = document.querySelector('.article-prose p') || document.querySelector('p');
      let contrast = null;
      const px = (s) => {
        const c = document.createElement('canvas');
        c.width = c.height = 1;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillStyle = s;
        ctx.fillRect(0, 0, 1, 1);
        return Array.from(ctx.getImageData(0, 0, 1, 1).data);
      };
      const lum = ([r, g, b]) => {
        const f = (v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const effBg = (el) => {
        let node = el;
        while (node) {
          const p = px(getComputedStyle(node).backgroundColor);
          if (p[3] > 0) return p;
          node = node.parentElement;
        }
        return [255, 255, 255, 255];
      };
      if (sample) {
        const fg = px(getComputedStyle(sample).color);
        const bg = effBg(sample);
        const l1 = lum(fg), l2 = lum(bg);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        contrast = {
          ratio: Math.round(ratio * 100) / 100,
          fg: getComputedStyle(sample).color,
          bg: 'rgb(' + bg.slice(0, 3).join(', ') + ')',
        };
      }
      return { scrollWidth, clientWidth, contrast };
    })()`,
  });
  const m = measure.result.value;

  const overflow = m.scrollWidth > m.clientWidth;
  console.log(`url: ${url}`);
  console.log(`viewport: 390x844`);
  console.log(`1. horizontal overflow: ${overflow ? 'FAIL' : 'PASS'} (scrollWidth=${m.scrollWidth}, clientWidth=${m.clientWidth})`);
  if (overflow) failed = true;

  if (m.contrast === null) {
    console.log('2. dark-mode contrast: NOT PERFORMED (no paragraph found on page)');
  } else {
    const pass = m.contrast.ratio >= 4.5;
    console.log(`2. dark-mode contrast: ${pass ? 'PASS' : 'FAIL'} (ratio=${m.contrast.ratio}:1, text=${m.contrast.fg} on ${m.contrast.bg})`);
    if (!pass) failed = true;
  }

  cdp.close();
} catch (err) {
  console.error(`tool error: ${err.message}`);
  failed = true;
} finally {
  chrome.kill();
}

process.exit(failed ? 1 : 0);
