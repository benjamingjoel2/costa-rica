// Renders every plate in plates.mjs to an optimised JPEG in public/images/plates.
// Usage: node scripts/plates/render.mjs [plate-name ...]
// Requires Playwright with a Chromium build (`npm i -D playwright` or a global install).
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { plates } from "./plates.mjs";

const require = createRequire(import.meta.url);
function loadPlaywright() {
  for (const id of ["playwright", process.env.PLAYWRIGHT_MODULE].filter(Boolean)) {
    try {
      return require(id);
    } catch {}
  }
  throw new Error("Playwright not found. Install it or set PLAYWRIGHT_MODULE to its path.");
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const outDir = join(root, "public", "images", "plates");
await mkdir(outDir, { recursive: true });

const only = process.argv.slice(2);
const { chromium } = loadPlaywright();
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage();

for (const [name, build] of Object.entries(plates)) {
  if (only.length && !only.includes(name)) continue;
  const svg = build();
  const [, w, h] = svg.match(/viewBox="0 0 (\d+) (\d+)"/).map(Number);
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  const buf = await page.screenshot({ type: "jpeg", quality: 84, clip: { x: 0, y: 0, width: w, height: h } });
  await writeFile(join(outDir, `${name}.jpg`), buf);
  console.log(`${name}.jpg  ${w}x${h}  ${(buf.length / 1024).toFixed(0)} KB`);
}

await browser.close();
