// Small, dependency-free helpers for composing the Selvora art plates.
// Everything is deterministic (seeded) so the plates can be regenerated exactly.

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 1D value noise with cosine interpolation, summed over octaves. Returns fn(x in 0..1) -> -1..1
export function noise1D(seed, { octaves = 4, base = 4, persistence = 0.5 } = {}) {
  const r = rng(seed);
  const layers = [];
  for (let o = 0; o < octaves; o++) {
    const n = base * 2 ** o + 1;
    layers.push(Array.from({ length: n + 1 }, () => r() * 2 - 1));
  }
  return (x) => {
    let sum = 0;
    let amp = 1;
    let norm = 0;
    layers.forEach((pts, o) => {
      const n = base * 2 ** o;
      const p = x * n;
      const i = Math.floor(p);
      const f = p - i;
      const t = (1 - Math.cos(f * Math.PI)) / 2;
      const v = pts[Math.min(i, pts.length - 1)] * (1 - t) + pts[Math.min(i + 1, pts.length - 1)] * t;
      sum += v * amp;
      norm += amp;
      amp *= persistence;
    });
    return sum / norm;
  };
}

export const f = (n) => Math.round(n * 10) / 10;

// Closed silhouette path from a height function y(x) down to the bottom edge.
export function fillBelow(W, H, yFn, steps = 160) {
  let d = `M0,${H} L0,${f(yFn(0))}`;
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * W;
    d += ` L${f(x)},${f(yFn(x))}`;
  }
  return `${d} L${W},${H} Z`;
}

// Mix two hex colours.
export function mix(a, b, t) {
  const pa = hex(a);
  const pb = hex(b);
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
function hex(h) {
  const s = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
}

// A forest edge: a ridge line topped with overlapping crowns.
export function canopy(W, H, yFn, { seed = 1, color, minR = 14, maxR = 40, density = 1, jitter = 10, from = 0, to = W, fill = true } = {}) {
  const r = rng(seed);
  let out = fill ? `<path d="${fillBelow(W, H, yFn)}" fill="${color}"/>` : "";
  let x = from - maxR;
  while (x < to + maxR) {
    const rad = minR + r() * (maxR - minR);
    const y = yFn(Math.max(0, Math.min(W, x))) + r() * jitter;
    out += `<circle cx="${f(x)}" cy="${f(y + rad * 0.35)}" r="${f(rad)}" fill="${color}"/>`;
    x += (rad * (0.7 + r() * 0.6)) / density;
  }
  return out;
}

// An emergent rainforest tree: tall trunk with an umbrella crown.
export function emergent(x, groundY, height, crownW, color, seed = 3) {
  const r = rng(seed);
  const top = groundY - height;
  const trunkW = Math.max(3, crownW * 0.05);
  let s = `<path d="M${f(x - trunkW)},${f(groundY)} C${f(x - trunkW * 0.6)},${f(top + height * 0.5)} ${f(x - trunkW * 0.4)},${f(top + 20)} ${f(x)},${f(top + 10)} C${f(x + trunkW * 0.4)},${f(top + 20)} ${f(x + trunkW * 0.6)},${f(top + height * 0.5)} ${f(x + trunkW)},${f(groundY)} Z" fill="${color}"/>`;
  const n = 7 + Math.floor(r() * 5);
  for (let i = 0; i < n; i++) {
    const cx = x + (r() - 0.5) * crownW;
    const cy = top + (r() - 0.3) * crownW * 0.12;
    const rx = crownW * (0.14 + r() * 0.14);
    s += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(rx * 0.42)}" fill="${color}"/>`;
  }
  // a few branches
  for (let i = 0; i < 3; i++) {
    const dir = i % 2 ? 1 : -1;
    s += `<path d="M${f(x)},${f(top + 30 + i * 12)} Q${f(x + dir * crownW * 0.18)},${f(top + 10)} ${f(x + dir * crownW * (0.28 + r() * 0.1))},${f(top)}" stroke="${color}" stroke-width="${f(trunkW * 0.6)}" fill="none"/>`;
  }
  return s;
}

// A palm silhouette with a curved trunk.
export function palm(x, groundY, height, lean, color, seed = 5) {
  const r = rng(seed);
  const tx = x + lean;
  const ty = groundY - height;
  let s = `<path d="M${f(x)},${f(groundY)} Q${f(x + lean * 0.2)},${f(groundY - height * 0.6)} ${f(tx)},${f(ty)}" stroke="${color}" stroke-width="${f(height * 0.04)}" fill="none" stroke-linecap="round"/>`;
  const fronds = 9;
  for (let i = 0; i < fronds; i++) {
    const a = (-Math.PI * 0.95) + (i / (fronds - 1)) * Math.PI * 0.9 + (r() - 0.5) * 0.25;
    const len = height * (0.28 + r() * 0.14);
    const ex = tx + Math.cos(a) * len;
    const ey = ty + Math.sin(a) * len * 0.5 + len * 0.35;
    const mx = tx + Math.cos(a) * len * 0.5;
    const my = ty + Math.sin(a) * len * 0.55 - len * 0.05;
    s += `<path d="M${f(tx)},${f(ty)} Q${f(mx)},${f(my - len * 0.12)} ${f(ex)},${f(ey)} Q${f(mx)},${f(my + len * 0.02)} ${f(tx)},${f(ty)} Z" fill="${color}"/>`;
  }
  return s;
}

// Distant birds as soft "v" strokes.
export function birds(list, color, width = 2.4) {
  return list
    .map(([x, y, s]) => `<path d="M${f(x - s)},${f(y - s * 0.3)} Q${f(x - s * 0.45)},${f(y - s * 0.55)} ${f(x)},${f(y)} Q${f(x + s * 0.45)},${f(y - s * 0.55)} ${f(x + s)},${f(y - s * 0.3)}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`)
    .join("");
}

// Horizontal mist band.
export function mist(W, y, h, color, opacity = 0.7, id = "m") {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity="0"/><stop offset=".5" stop-color="${color}" stop-opacity="${opacity}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><rect x="-50" y="${f(y)}" width="${W + 100}" height="${f(h)}" fill="url(#${id})" filter="url(#blur)"/>`;
}

// Water: shimmering horizontal strokes.
export function shimmer(W, y0, y1, color, seed = 9, count = 60, opacity = 0.35) {
  const r = rng(seed);
  let s = "";
  for (let i = 0; i < count; i++) {
    const t = r();
    const y = y0 + (y1 - y0) * t * t;
    const len = 20 + r() * 140 * (0.4 + t);
    const x = r() * W;
    s += `<rect x="${f(x)}" y="${f(y)}" width="${f(len)}" height="${f(1 + t * 2.4)}" rx="1" fill="${color}" opacity="${f(opacity * (0.4 + r() * 0.6) * 100) / 100}"/>`;
  }
  return s;
}

export function sky(W, H, stops, id = "sky") {
  const st = stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("");
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${st}</linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
}

export function glow(cx, cy, r, color, opacity = 0.6, id = "glow") {
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${opacity}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})"/>`;
}

export function frame(W, H, body, { grain = 0.16 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">
<defs>
<filter id="blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="${Math.round(W / 160)}"/></filter>
<filter id="soft"><feGaussianBlur stdDeviation="2"/></filter>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch" seed="4"/><feColorMatrix type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1"/></filter>
<radialGradient id="vignette" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#0b1712" stop-opacity=".38"/></radialGradient>
</defs>
${body}
<rect width="${W}" height="${H}" fill="url(#vignette)"/>
<rect width="${W}" height="${H}" filter="url(#grain)" opacity="${grain}" style="mix-blend-mode:overlay"/>
</svg>`;
}
