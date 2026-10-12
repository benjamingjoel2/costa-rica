// Renders public/og.jpg (1200x630), the default social sharing image.
// Usage: node scripts/plates/render-og.mjs (requires Playwright; see render.mjs)
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

const hero = (await readFile(join(root, "public/images/plates/hero-canopy.jpg"))).toString("base64");
const mark = (await readFile(join(root, "public/brand/selvora-wordmark-ivory.svg"))).toString("base64");

const html = `<html><head><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@600&display=block" rel="stylesheet"></head>
<body style="margin:0;width:1200px;height:630px;position:relative;overflow:hidden;font-family:Manrope,sans-serif">
<img src="data:image/jpeg;base64,${hero}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(15,42,34,.88),rgba(15,42,34,.25) 60%,rgba(15,42,34,.15))"></div>
<img src="data:image/svg+xml;base64,${mark}" style="position:absolute;left:72px;bottom:150px;height:96px">
<p style="position:absolute;left:76px;bottom:78px;margin:0;color:#F3EFE5;font-size:22px;letter-spacing:.2em;text-transform:uppercase;font-weight:600">Tailor-made Costa Rica journeys</p>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await writeFile(join(root, "public/og.jpg"), await page.screenshot({ type: "jpeg", quality: 85 }));
await browser.close();
console.log("public/og.jpg");
