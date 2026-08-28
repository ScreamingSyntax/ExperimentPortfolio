/**
 * Renders design/og-card.html to public/og-image.png at 1200x630 — the size
 * large-image link previews expect on X, LinkedIn, Slack, and Facebook.
 *
 * Run with `npm run og` after editing the card. Needs a Chromium-based
 * browser installed and a network connection (the card pulls Archivo Black
 * and Space Mono from Google Fonts).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'design/og-card.html');
const output = resolve(root, 'public/og-image.png');

const CANDIDATES = [
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  process.env.CHROME_PATH,
].filter(Boolean);

const browser = CANDIDATES.find((p) => existsSync(p));

if (!browser) {
  console.error(
    'No Chromium-based browser found. Install Chrome or Brave, or set CHROME_PATH.'
  );
  process.exit(1);
}

mkdirSync(dirname(output), { recursive: true });

execFileSync(
  browser,
  [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    `--screenshot=${output}`,
    '--window-size=1200,630',
    // Give the webfonts time to load before the frame is captured.
    '--virtual-time-budget=8000',
    pathToFileURL(source).href,
  ],
  { stdio: 'inherit' }
);

console.log(`Wrote ${output} (1200x630)`);
