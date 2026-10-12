// Compositions for each Selvora art plate. Each returns an SVG string.
// These are original, illustrative landscapes intended as placeholders until
// licensed photography is supplied (see docs/IMAGERY.md).
import { rng, noise1D, fillBelow, mix, canopy, emergent, palm, birds, mist, shimmer, sky, glow, frame, f } from "./lib.mjs";

const C = {
  ivory: "#F3EFE5",
  sage: "#D8E5D9",
  green: "#173D32",
  deep: "#0E2620",
  charcoal: "#252923",
  terra: "#B46E4B",
  sand: "#E6D3B0",
  ochre: "#C69C5E",
  peach: "#EBC4A0",
  sea: "#58847D",
  mistc: "#E8ECE3",
};

// Stack of forested ridges receding into haze.
function ridges(W, H, { layers, top, bottom, far, near, hazeColor, seed = 1, amp = 0.08, canopyFrom = 2, mistEvery = true, maxR }) {
  let s = "";
  for (let i = 0; i < layers; i++) {
    const t = i / (layers - 1);
    const base = top + (bottom - top) * t;
    const n = noise1D(seed + i * 17, { octaves: 5, base: 2 + i, persistence: 0.55 });
    const a = H * amp * (1 - t * 0.35);
    const y = (x) => base + n(x / W) * a;
    const col = mix(far, near, Math.pow(t, 1.25));
    if (i >= canopyFrom) {
      const scale = 0.4 + t * 1.1;
      s += canopy(W, H, y, { seed: seed + i, color: col, minR: 8 * scale, maxR: (maxR ?? 26) * scale, jitter: 6 * scale });
    } else {
      s += `<path d="${fillBelow(W, H, y)}" fill="${col}"/>`;
    }
    if (mistEvery && i < layers - 1) s += mist(W, base + a * 0.2, H * 0.08, hazeColor, 0.55 - t * 0.35, `mist${seed}_${i}`);
  }
  return s;
}

export const plates = {
  // Dawn over layered rainforest ridges: the hero.
  "hero-canopy": () => {
    const W = 2400, H = 1500;
    let b = sky(W, H, [[0, "#E9E3D2"], [0.45, "#F1DCC2"], [0.62, "#E9CDB0"], [1, "#D9D3BF"]]);
    b += glow(1560, 600, 520, "#F7E6CC", 0.85, "sun");
    b += `<circle cx="1560" cy="610" r="64" fill="#F6E7CF" opacity=".9"/>`;
    b += ridges(W, H, { layers: 7, top: 640, bottom: 1240, far: "#C9CDB9", near: C.deep, hazeColor: "#EFE3CF", seed: 11, amp: 0.07, canopyFrom: 2 });
    b += emergent(380, 1330, 520, 330, "#0B201B", 21);
    b += emergent(2080, 1360, 440, 260, "#0B201B", 22);
    b += birds([[1220, 470, 16], [1270, 500, 12], [1180, 520, 10], [1320, 455, 9]], "#3D4A3F", 3);
    return frame(W, H, b);
  },

  // Arenal: a near-perfect cone with a cloud cap over a lake.
  arenal: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#CFD6CB"], [0.55, "#E6E2D2"], [1, "#E4DDC9"]]);
    const cx = 980, peakY = 260, baseY = 760;
    const n = noise1D(31, { octaves: 4, base: 6 });
    const cone = (x) => {
      const d = Math.abs(x - cx);
      const slope = Math.pow(d / 760, 0.82) * (baseY - peakY);
      return Math.min(baseY + 40, peakY + slope + n(x / W) * 10 + (d < 30 ? 8 : 0));
    };
    b += `<path d="${fillBelow(W, H, cone, 220)}" fill="#6F7F71"/>`;
    // erosion gullies
    const r = rng(7);
    for (let i = 0; i < 26; i++) {
      const sx = cx + (r() - 0.5) * 120;
      const ex = cx + (sx - cx) * 6 + (r() - 0.5) * 120;
      b += `<path d="M${f(sx)},${f(cone(sx) + 6)} L${f(ex)},${f(cone(ex) - 4)}" stroke="#5E6E61" stroke-width="${f(1.5 + r() * 2.5)}" opacity=".6"/>`;
    }
    b += mist(W, 210, 140, "#F2EEE3", 0.95, "cap");
    b += `<ellipse cx="${cx + 40}" cy="270" rx="230" ry="46" fill="#F2EEE3" opacity=".8" filter="url(#blur)"/>`;
    b += ridges(W, H, { layers: 3, top: 700, bottom: 820, far: "#5B7464", near: "#2B4A3D", hazeColor: "#E6E2D2", seed: 41, amp: 0.035, canopyFrom: 0, maxR: 20 });
    // lake
    b += `<rect x="0" y="860" width="${W}" height="${H - 860}" fill="#8E9E92"/>`;
    b += `<path d="M${cx - 300},860 L${cx - 40},1060 L${cx + 40},1060 L${cx + 300},860 Z" fill="#7C8E82" opacity=".7" filter="url(#blur)"/>`;
    b += shimmer(W, 870, H, "#EEF0E6", 12, 90, 0.35);
    b += canopy(W, H, (x) => 1110 + Math.sin(x / 140) * 14 - (x < 500 ? (500 - x) * 0.25 : 0), { seed: 4, color: C.deep, minR: 18, maxR: 46 });
    return frame(W, H, b);
  },

  // Monteverde: cloud forest, layered fog, tall trees in silhouette.
  monteverde: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#DCE2D9"], [1, "#E9ECE4"]]);
    b += ridges(W, H, { layers: 6, top: 420, bottom: 1000, far: "#C8D2C6", near: "#1E3B31", hazeColor: "#EEF1EA", seed: 77, amp: 0.1, canopyFrom: 1, maxR: 30 });
    b += mist(W, 640, 260, "#F1F3EE", 0.9, "fog1");
    b += emergent(260, 1200, 760, 280, "#132A23", 5);
    b += emergent(1500, 1200, 640, 240, "#132A23", 6);
    b += emergent(1700, 1200, 520, 200, "#1B342C", 8);
    b += mist(W, 980, 260, "#EEF1EA", 0.6, "fog2");
    // epiphyte strands hanging from the left tree
    const r = rng(19);
    for (let i = 0; i < 18; i++) {
      const x = 150 + r() * 240;
      const y = 470 + r() * 60;
      b += `<path d="M${f(x)},${f(y)} q${f((r() - 0.5) * 10)},${f(60 + r() * 120)} ${f((r() - 0.5) * 8)},${f(120 + r() * 140)}" stroke="#132A23" stroke-width="2" fill="none" opacity=".75"/>`;
    }
    return frame(W, H, b);
  },

  // Guanacaste: dry-season gold, rolling hills, a guanacaste tree, the Pacific beyond.
  guanacaste: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#E7D8BC"], [0.6, "#F2E2C4"], [1, "#EAD3AE"]]);
    b += glow(380, 520, 360, "#F8E7C6", 0.8, "g1");
    b += `<rect x="0" y="560" width="${W}" height="200" fill="#9DB0A3"/>`;
    b += shimmer(W, 565, 640, "#F3EEDF", 3, 50, 0.5);
    const hills = [
      [600, "#C9B48C", 0.05, 2],
      [690, "#B89C6C", 0.06, 3],
      [800, "#9E8457", 0.05, 4],
      [930, "#6F6A47", 0.05, 5],
    ];
    hills.forEach(([base, col, amp, seed]) => {
      const n = noise1D(seed * 13, { octaves: 3, base: 1.5 });
      b += `<path d="${fillBelow(W, H, (x) => base + n(x / W) * H * amp + (x < 700 ? (700 - x) * 0.12 : 0))}" fill="${col}"/>`;
    });
    // guanacaste tree: short trunk, very wide flat crown
    const tx = 1260, ty = 900;
    b += `<path d="M${tx - 18},${ty + 120} C${tx - 14},${ty + 40} ${tx - 30},${ty - 40} ${tx - 120},${ty - 120} L${tx - 100},${ty - 128} C${tx - 20},${ty - 70} ${tx},${ty - 70} ${tx + 10},${ty - 140} L${tx + 26},${ty - 140} C${tx + 20},${ty - 60} ${tx + 40},${ty - 60} ${tx + 140},${ty - 120} L${tx + 150},${ty - 110} C${tx + 50},${ty - 40} ${tx + 20},${ty + 40} ${tx + 22},${ty + 120} Z" fill="#2E3324"/>`;
    const r = rng(23);
    for (let i = 0; i < 26; i++) {
      const cx = tx + (r() - 0.5) * 560;
      const cy = ty - 150 + (r() - 0.5) * 40 - (1 - Math.abs(cx - tx) / 300) * 30;
      b += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(50 + r() * 60)}" ry="${f(18 + r() * 16)}" fill="#2E3324"/>`;
    }
    b += `<path d="${fillBelow(W, H, (x) => 1080 + Math.sin(x / 210) * 16)}" fill="#3E3B27"/>`;
    // dry grass strokes
    for (let i = 0; i < 260; i++) {
      const x = r() * W;
      const y = 1040 + r() * 160;
      b += `<path d="M${f(x)},${f(y)} l${f((r() - 0.5) * 14)},${f(-20 - r() * 30)}" stroke="#7A6A42" stroke-width="1.6" opacity=".7"/>`;
    }
    return frame(W, H, b);
  },

  // Nicoya: a cove at low sun, layered swell, a rocky headland.
  nicoya: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#E2CFB8"], [0.5, "#EDC7A3"], [0.66, "#E7B993"], [1, "#D9B595"]]);
    b += glow(1100, 640, 420, "#F6D8B4", 0.9, "s");
    b += `<circle cx="1100" cy="650" r="70" fill="#F3D4AE"/>`;
    const n = noise1D(91, { octaves: 4, base: 3 });
    b += canopy(W, H, (x) => (x < 820 ? 480 + Math.pow(x / 820, 2.2) * 210 + n(x / W) * 24 : 690 + (x - 820) * 2), { seed: 9, color: "#2A3A31", minR: 12, maxR: 34 });
    b += `<rect x="0" y="672" width="${W}" height="${H - 672}" fill="#7E8C86"/>`;
    b += `<rect x="920" y="672" width="360" height="${H - 672}" fill="#E4C09E" opacity=".35" filter="url(#blur)"/>`;
    b += shimmer(W, 674, 900, "#F2D7B8", 33, 120, 0.55);
    b += `<path d="M1460,676 q10,-60 40,-70 q30,8 36,70 Z" fill="#33403A"/>`;
    const r = rng(5);
    for (let i = 0; i < 9; i++) {
      const y = 860 + i * i * 4.5;
      b += `<path d="M-20,${y} ${Array.from({ length: 12 }, (_, k) => `Q${k * 170 + 85},${f(y - 6 - r() * 6)} ${(k + 1) * 170},${y}`).join(" ")}" stroke="#F3E6D3" stroke-width="${f(1.5 + i * 0.4)}" fill="none" opacity="${f(0.25 + i * 0.05)}"/>`;
    }
    b += `<path d="${fillBelow(W, H, (x) => 1060 - Math.sin(x / 600) * 40 + x * 0.02)}" fill="#E1C8A4"/>`;
    b += `<path d="${fillBelow(W, H, (x) => 1050 - Math.sin(x / 600) * 40 + x * 0.02)}" fill="#F0E2CC" opacity=".5"/>`;
    b += palm(140, 1200, 560, 160, "#1E2A24", 6);
    return frame(W, H, b);
  },

  // Central Pacific: forested headland, a pale beach arc, islands offshore.
  "manuel-antonio": () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#D7E0D9"], [1, "#EDEBDF"]]);
    b += `<rect x="0" y="560" width="${W}" height="${H - 560}" fill="#6E9890"/>`;
    b += `<rect x="0" y="560" width="${W}" height="120" fill="#9DB7AE" opacity=".6" filter="url(#blur)"/>`;
    b += shimmer(W, 565, 900, "#E9F0EA", 51, 90, 0.35);
    b += `<path d="M1000,564 q40,-60 110,-62 q60,6 90,62 Z" fill="#4D6A5A"/>`;
    b += `<path d="M1300,564 q20,-26 50,-28 q30,4 40,28 Z" fill="#5E7C6B"/>`;
    b += canopy(W, H, (x) => (x > 1260 ? 880 - Math.pow((x - 1260) / 540, 0.8) * 420 : 1300), { seed: 14, color: "#2A4637", minR: 16, maxR: 42, from: 1180 });
    b += canopy(W, H, (x) => (x < 640 ? 460 + Math.pow(x / 640, 1.4) * 440 : 1300), { seed: 15, color: C.deep, minR: 20, maxR: 54, to: 700 });
    b += `<path d="M0,900 Q700,1000 1800,860 L1800,${H} L0,${H} Z" fill="#E8DBC2"/>`;
    b += `<path d="M0,900 Q700,1000 1800,860" stroke="#F6F1E6" stroke-width="10" fill="none" opacity=".8"/>`;
    b += palm(520, 990, 460, 150, "#16302A", 4);
    b += palm(700, 1010, 380, 190, "#16302A", 8);
    return frame(W, H, b);
  },

  // Osa: a river curling through deep canopy to the gulf, macaws overhead.
  osa: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#D5DACB"], [1, "#E8E3D1"]]);
    b += ridges(W, H, { layers: 3, top: 380, bottom: 470, far: "#A9B7A8", near: "#6F8676", hazeColor: "#E4E6DA", seed: 205, amp: 0.05, canopyFrom: 1, maxR: 18 });
    b += `<rect x="0" y="500" width="${W}" height="${H - 500}" fill="#8EA59E"/>`;
    b += shimmer(W, 502, 720, "#EEF0E6", 8, 90, 0.4);
    b += ridges(W, H, { layers: 4, top: 680, bottom: 1000, far: "#4F6B5C", near: "#0F2A21", hazeColor: "#E4E6DA", seed: 211, amp: 0.05, canopyFrom: 0, maxR: 30, mistEvery: false });
    b += canopy(W, H, (x) => 1110 + Math.sin(x / 90) * 12, { seed: 6, color: "#0A1F19", minR: 22, maxR: 60 });
    b += emergent(1500, 1200, 560, 300, "#0A1F19", 41);
    [[620, 250, 1], [700, 230, 0.85], [1180, 320, 0.7]].forEach(([x, y, s]) => {
      b += `<g transform="translate(${x},${y}) scale(${s})"><path d="M-46,-6 Q-20,-30 0,0 Q20,-30 46,-6 Q20,-14 0,6 Q-20,-14 -46,-6 Z" fill="#A8473A"/><path d="M0,0 L-6,46 L0,40 L6,46 Z" fill="#A8473A"/><path d="M-30,-10 Q-16,-18 -6,-4" stroke="#C8A24A" stroke-width="3" fill="none"/></g>`;
    });
    return frame(W, H, b);
  },

  // Caribbean: flat coastline, low cloud, leaning coconut palms.
  caribbean: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#DCDDD2"], [0.6, "#EDE6D6"], [1, "#E6DECB"]]);
    const r = rng(8);
    for (let i = 0; i < 7; i++) {
      b += `<ellipse cx="${f(r() * W)}" cy="${f(160 + r() * 260)}" rx="${f(180 + r() * 220)}" ry="${f(26 + r() * 30)}" fill="#F4F1E8" opacity=".75" filter="url(#blur)"/>`;
    }
    b += `<rect x="0" y="620" width="${W}" height="${H - 620}" fill="#7FA39B"/>`;
    b += `<rect x="0" y="620" width="${W}" height="40" fill="#A9C1B8" opacity=".7"/>`;
    b += shimmer(W, 625, 900, "#EEF2EA", 61, 120, 0.4);
    // reef line
    b += `<path d="M0,760 Q500,740 1100,770 T1800,750" stroke="#F1F1E8" stroke-width="5" fill="none" opacity=".55"/>`;
    b += `<path d="${fillBelow(W, H, (x) => 940 + Math.sin(x / 380) * 20 - x * 0.03)}" fill="#E3D6BB"/>`;
    b += canopy(W, H, (x) => (x > 1100 ? 940 - (x - 1100) * 0.6 : 1400), { seed: 17, color: "#20392F", minR: 18, maxR: 46 });
    b += palm(1240, 960, 640, -300, "#162B24", 2);
    b += palm(1420, 920, 560, -220, "#162B24", 3);
    b += palm(1600, 900, 700, -160, "#1B332B", 7);
    b += `<path d="${fillBelow(W, H, (x) => 1110 + Math.sin(x / 200) * 10)}" fill="#D8C8A8"/>`;
    return frame(W, H, b);
  },

  // Tortuguero-style canal: water corridor between forest walls.
  canal: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#D9DED3"], [1, "#E9E9DE"]]);
    const vx = 900, vy = 600;
    // forest walls converge on the vanishing point
    b += canopy(W, H, (x) => vy - 20 - Math.pow(Math.abs(x - vx) / vx, 1.3) * 420, { seed: 1, color: "#21392F", minR: 14, maxR: 52 });
    b += mist(W, vy - 160, 200, "#EEF0E8", 0.65, "cm");
    // water wedge
    b += `<path d="M${vx - 50},${vy} L${vx + 50},${vy} L${W + 300},${H} L-300,${H} Z" fill="#8FA398"/>`;
    b += `<path d="M${vx - 50},${vy} L${vx + 50},${vy} L${vx + 260},${H} L${vx - 260},${H} Z" fill="#B9C6BA" opacity=".6" filter="url(#blur)"/>`;
    b += `<path d="M${vx - 50},${vy} L-300,${H} L-300,${H - 40} L${vx - 52},${vy + 4} Z" fill="#2F4A3E" opacity=".6"/>`;
    b += `<path d="M${vx + 50},${vy} L${W + 300},${H} L${W + 300},${H - 40} L${vx + 52},${vy + 4} Z" fill="#2F4A3E" opacity=".6"/>`;
    b += `<clipPath id="water"><path d="M${vx - 50},${vy} L${vx + 50},${vy} L${W + 300},${H} L-300,${H} Z"/></clipPath><g clip-path="url(#water)">${shimmer(W, vy + 6, H, "#E7ECE2", 29, 110, 0.45)}</g>`;
    b += `<path d="M820,860 L1000,860 L972,884 L846,884 Z" fill="#2B2A24"/><rect x="896" y="836" width="6" height="26" fill="#2B2A24"/>`;
    b += canopy(W, H, () => 1300, { seed: 3, color: "#132820", minR: 40, maxR: 90, fill: false, to: 260 });
    b += palm(80, H, 620, 180, "#132820", 11);
    b += palm(1740, H, 560, -160, "#132820", 12);
    return frame(W, H, b);
  },

  // Hot springs: steam over pools in dark forest, warm light.
  "hot-springs": () => {
    const W = 1600, H = 1200;
    let b = `<rect width="${W}" height="${H}" fill="#1B2D26"/>`;
    b += glow(800, 520, 700, "#C9A27C", 0.45, "warm");
    b += canopy(W, H, (x) => 260 + Math.sin(x / 160) * 40, { seed: 2, color: "#2A4237", minR: 30, maxR: 80 });
    b += glow(800, 560, 520, "#D7B48D", 0.35, "warm2");
    // terraced pools
    const pools = [[800, 720, 520, 70, "#7F9C92"], [620, 860, 420, 60, "#74928A"], [1040, 900, 380, 54, "#6E8B82"], [800, 1040, 640, 80, "#678479"]];
    pools.forEach(([cx, cy, rx, ry, col]) => {
      b += `<ellipse cx="${cx}" cy="${cy + 10}" rx="${rx + 18}" ry="${ry + 16}" fill="#3B3A31"/>`;
      b += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${col}"/>`;
      b += `<ellipse cx="${cx - rx * 0.2}" cy="${cy - ry * 0.3}" rx="${rx * 0.5}" ry="${ry * 0.25}" fill="#E7DCC6" opacity=".35"/>`;
    });
    const r = rng(3);
    for (let i = 0; i < 22; i++) {
      const x = 300 + r() * 1000;
      const y = 520 + r() * 520;
      b += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(90 + r() * 150)}" ry="${f(40 + r() * 70)}" fill="#F2EBDD" opacity="${f(0.12 + r() * 0.18)}" filter="url(#blur)"/>`;
    }
    b += `<path d="${fillBelow(W, H, (x) => 1130 + Math.sin(x / 120) * 18)}" fill="#14241E"/>`;
    // foreground fronds
    for (let i = 0; i < 6; i++) {
      const x = i < 3 ? 40 + i * 60 : W - 40 - (i - 3) * 60;
      const dir = i < 3 ? 1 : -1;
      b += `<path d="M${x},${H} Q${x + dir * 120},${H - 300} ${x + dir * (240 + i * 20)},${H - 420 + i * 30} Q${x + dir * 80},${H - 220} ${x + 10},${H} Z" fill="#0F1E19"/>`;
    }
    return frame(W, H, b);
  },

  // A timber pavilion under the canopy at dusk.
  lodge: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#B9B7A2"], [0.6, "#D8C3A3"], [1, "#C7AD8A"]]);
    b += ridges(W, H, { layers: 3, top: 420, bottom: 560, far: "#8C9584", near: "#4A5B4B", hazeColor: "#DCCAAE", seed: 300, amp: 0.05, canopyFrom: 0 });
    b += canopy(W, H, (x) => 640 + Math.sin(x / 200) * 30, { seed: 5, color: "#26372E", minR: 24, maxR: 60 });
    // pavilion: wide roof, posts, warm interior
    const L = 520, R = 1300, roofY = 600, eave = 640, floor = 860;
    b += `<rect x="${L + 30}" y="${eave}" width="${R - L - 60}" height="${floor - eave}" fill="#E9B97C" opacity=".85"/>`;
    b += glow((L + R) / 2, 760, 420, "#F2C78F", 0.5, "lamp");
    for (let i = 0; i <= 6; i++) {
      const x = L + 40 + i * ((R - L - 80) / 6);
      b += `<rect x="${f(x - 6)}" y="${eave}" width="12" height="${floor - eave}" fill="#2B2620"/>`;
    }
    b += `<path d="M${L - 120},${eave} L${(L + R) / 2},${roofY - 90} L${R + 120},${eave} L${R + 90},${eave + 14} L${L - 90},${eave + 14} Z" fill="#2A251F"/>`;
    b += `<rect x="${L - 40}" y="${floor}" width="${R - L + 80}" height="16" fill="#2A251F"/>`;
    for (let i = 0; i < 9; i++) b += `<rect x="${L - 20 + i * 100}" y="${floor + 16}" width="10" height="130" fill="#221E19"/>`;
    // chairs/table silhouettes inside
    b += `<rect x="760" y="800" width="280" height="10" fill="#3A2D20"/><rect x="780" y="810" width="8" height="50" fill="#3A2D20"/><rect x="1012" y="810" width="8" height="50" fill="#3A2D20"/>`;
    b += `<path d="${fillBelow(W, H, (x) => 1000 + Math.sin(x / 150) * 20)}" fill="#13221C"/>`;
    b += canopy(W, H, (x) => (x < 360 ? 200 + x * 1.2 : 2000), { seed: 8, color: "#0F1C17", minR: 30, maxR: 70 });
    b += canopy(W, H, (x) => (x > 1500 ? 200 + (W - x) * 1.6 : 2000), { seed: 9, color: "#0F1C17", minR: 30, maxR: 70 });
    return frame(W, H, b);
  },

  // Coffee rows on Central Valley slopes with a volcano behind.
  coffee: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#D7DCD0"], [1, "#ECE6D5"]]);
    b += `<path d="${fillBelow(W, H, (x) => 380 + Math.pow(Math.abs(x - 1200) / 900, 0.9) * 300)}" fill="#A4AEA0"/>`;
    b += mist(W, 470, 160, "#EEEDE2", 0.8, "cfm");
    b += `<path d="${fillBelow(W, H, (x) => 600 + Math.sin(x / 300) * 40)}" fill="#7E9171"/>`;
    // rows
    for (let i = 0; i < 26; i++) {
      const y = 640 + i * i * 0.9 + i * 6;
      const w = 4 + i * 0.9;
      b += `<path d="M-20,${f(y + Math.sin(i) * 10)} Q900,${f(y - 40 + i * 2)} 1820,${f(y + 10)}" stroke="#3E5A3F" stroke-width="${f(w)}" fill="none" stroke-linecap="round"/>`;
    }
    // shade trees
    b += emergent(380, 820, 300, 260, "#2F4632", 31);
    b += emergent(1460, 760, 240, 220, "#3A523C", 32);
    return frame(W, H, b);
  },

  // A narrow waterfall into a green pool (portrait).
  waterfall: () => {
    const W = 1200, H = 1600;
    let b = `<rect width="${W}" height="${H}" fill="#1E352C"/>`;
    b += sky(W, 360, [[0, "#DDE3D7"], [1, "#B9C8B9"]], "wsky");
    b += canopy(W, H, (x) => 260 + Math.sin(x / 100) * 30, { seed: 3, color: "#355244", minR: 26, maxR: 60 });
    // cliff walls
    b += `<path d="M0,300 L520,330 L540,1180 L0,1260 Z" fill="#24382F"/><path d="M${W},300 L700,330 L690,1180 L${W},1260 Z" fill="#20332A"/>`;
    // falling water
    b += `<path d="M560,330 C556,700 548,980 520,1180 L700,1180 C672,980 664,700 660,330 Z" fill="#E8EEE6"/>`;
    const r = rng(4);
    for (let i = 0; i < 40; i++) {
      const x = 560 + r() * 100;
      b += `<path d="M${f(x)},${f(330 + r() * 200)} L${f(x - 10 + r() * 6)},${f(900 + r() * 260)}" stroke="#BFD0C6" stroke-width="${f(1 + r() * 3)}" opacity=".7"/>`;
    }
    b += `<ellipse cx="610" cy="1190" rx="320" ry="90" fill="#F2F4EE" opacity=".6" filter="url(#blur)"/>`;
    b += `<path d="M0,1230 Q600,1150 ${W},1230 L${W},${H} L0,${H} Z" fill="#4E7A6E"/>`;
    b += shimmer(W, 1240, H, "#D9E6DD", 12, 70, 0.35);
    for (let i = 0; i < 8; i++) {
      const x = i < 4 ? i * 70 : W - (i - 4) * 70;
      const dir = i < 4 ? 1 : -1;
      b += `<path d="M${x},${H} Q${x + dir * 140},${H - 360} ${x + dir * (300 + i * 14)},${H - 520 + i * 30} Q${x + dir * 90},${H - 260} ${x + 12},${H} Z" fill="#10211B"/>`;
    }
    return frame(W, H, b);
  },

  // Botanical study: overlapping broad leaves (portrait).
  fronds: () => {
    const W = 1200, H = 1500;
    let b = `<rect width="${W}" height="${H}" fill="#24463A"/>`;
    const r = rng(42);
    const cols = ["#1A3A2F", "#2D5546", "#3B6553", "#173D32", "#4C735F", "#20453A"];
    for (let i = 0; i < 16; i++) {
      const cx = r() * W;
      const cy = r() * H;
      const len = 380 + r() * 420;
      const a = r() * Math.PI * 2;
      const wdt = len * (0.28 + r() * 0.12);
      const col = cols[i % cols.length];
      const ex = cx + Math.cos(a) * len, ey = cy + Math.sin(a) * len;
      const nx = -Math.sin(a) * wdt, ny = Math.cos(a) * wdt;
      const mx = (cx + ex) / 2, my = (cy + ey) / 2;
      b += `<path d="M${f(cx)},${f(cy)} Q${f(mx + nx)},${f(my + ny)} ${f(ex)},${f(ey)} Q${f(mx - nx)},${f(my - ny)} ${f(cx)},${f(cy)} Z" fill="${col}"/>`;
      b += `<path d="M${f(cx)},${f(cy)} L${f(ex)},${f(ey)}" stroke="#8FAE99" stroke-width="2.5" opacity=".45"/>`;
      for (let k = 1; k < 8; k++) {
        const t = k / 8;
        const px = cx + (ex - cx) * t, py = cy + (ey - cy) * t;
        const s = Math.sin(t * Math.PI) * 0.8;
        b += `<path d="M${f(px)},${f(py)} l${f(nx * s + Math.cos(a) * 30)},${f(ny * s + Math.sin(a) * 30)} M${f(px)},${f(py)} l${f(-nx * s + Math.cos(a) * 30)},${f(-ny * s + Math.sin(a) * 30)}" stroke="#8FAE99" stroke-width="1.2" opacity=".25"/>`;
      }
    }
    b += glow(W * 0.7, H * 0.25, 600, "#E4D9B6", 0.35, "dapple");
    return frame(W, H, b);
  },

  // Humpback fluke at dawn on the southern Pacific.
  whale: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#D4D8CC"], [0.6, "#EBDAC3"], [1, "#E3CDB3"]]);
    b += `<path d="${fillBelow(W, H, (x) => 560 - Math.max(0, 1 - Math.abs(x - 300) / 500) * 120 + Math.sin(x / 80) * 4)}" fill="#8D9A8E"/>`;
    b += `<rect x="0" y="600" width="${W}" height="${H - 600}" fill="#5F7C78"/>`;
    b += shimmer(W, 604, H, "#E9E2D2", 77, 160, 0.35);
    // fluke
    const x = 1080, y = 700;
    b += `<path d="M${x},${y + 120} C${x - 10},${y + 60} ${x - 6},${y + 30} ${x - 20},${y} C${x - 90},${y - 20} ${x - 200},${y - 60} ${x - 260},${y - 120} C${x - 180},${y - 100} ${x - 80},${y - 70} ${x - 10},${y - 40} L${x},${y - 30} L${x + 10},${y - 40} C${x + 80},${y - 70} ${x + 180},${y - 100} ${x + 260},${y - 120} C${x + 200},${y - 60} ${x + 90},${y - 20} ${x + 20},${y} C${x + 6},${y + 30} ${x + 10},${y + 60} ${x},${y + 120} Z" fill="#1F2B29"/>`;
    // water streaming off the fluke
    const r = rng(9);
    for (let i = 0; i < 22; i++) {
      const sx = x - 240 + r() * 480;
      b += `<path d="M${f(sx)},${f(y - 100 + Math.abs(sx - x) * -0.05 + 60)} l0,${f(40 + r() * 80)}" stroke="#EEF0EA" stroke-width="${f(1 + r() * 2)}" opacity=".6"/>`;
    }
    b += `<ellipse cx="${x}" cy="${y + 120}" rx="180" ry="20" fill="#E8EEE8" opacity=".55"/>`;
    return frame(W, H, b);
  },

  // A hanging bridge across the canopy in cloud (portrait-friendly).
  bridge: () => {
    const W = 1600, H = 1200;
    let b = sky(W, H, [[0, "#DDE3DA"], [1, "#E6EAE1"]]);
    b += ridges(W, H, { layers: 5, top: 380, bottom: 980, far: "#C3CEC2", near: "#22402F", hazeColor: "#EEF1EA", seed: 501, amp: 0.06, canopyFrom: 0, maxR: 34 });
    b += mist(W, 560, 260, "#F2F4EF", 0.85, "bm");
    // bridge catenary
    const x0 = -40, x1 = W + 40, y0 = 520, sag = 170;
    const cat = (t) => y0 + sag * (1 - Math.pow(2 * t - 1, 2));
    let deck = "", rail = "";
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const x = x0 + (x1 - x0) * t;
      deck += `${i ? "L" : "M"}${f(x)},${f(cat(t))} `;
      rail += `${i ? "L" : "M"}${f(x)},${f(cat(t) - 70)} `;
      if (i % 3 === 0) b += `<line x1="${f(x)}" y1="${f(cat(t) - 70)}" x2="${f(x)}" y2="${f(cat(t))}" stroke="#2A2D26" stroke-width="2"/>`;
    }
    b += `<path d="${deck}" stroke="#2A2D26" stroke-width="10" fill="none"/><path d="${rail}" stroke="#2A2D26" stroke-width="3" fill="none"/>`;
    b += emergent(160, 1200, 900, 300, "#152C24", 12);
    b += emergent(1460, 1200, 820, 280, "#152C24", 13);
    return frame(W, H, b);
  },

  // A turquoise river through the forest (Río Celeste-like palette).
  river: () => {
    const W = 1800, H = 1200;
    let b = sky(W, H, [[0, "#D8DFD5"], [1, "#E5E8DC"]]);
    b += ridges(W, H, { layers: 4, top: 300, bottom: 600, far: "#A8B8A8", near: "#28473A", hazeColor: "#EAEDE5", seed: 610, amp: 0.06, canopyFrom: 0 });
    b += `<path d="${fillBelow(W, H, (x) => 640 + Math.sin(x / 300) * 20)}" fill="#1F3A2F"/>`;
    b += `<path d="M560,${H} C620,980 980,940 900,820 C840,730 820,690 870,650 L930,650 C960,700 1080,760 1140,840 C1240,980 1100,1080 1220,${H} Z" fill="#7FB5B0"/>`;
    b += `<path d="M700,${H} C760,1000 960,960 920,860" stroke="#BFE0D9" stroke-width="10" fill="none" opacity=".6" filter="url(#soft)"/>`;
    const r = rng(2);
    for (let i = 0; i < 12; i++) b += `<ellipse cx="${f(640 + r() * 520)}" cy="${f(940 + r() * 240)}" rx="${f(20 + r() * 40)}" ry="${f(10 + r() * 14)}" fill="#5E6B60"/>`;
    b += canopy(W, H, (x) => 700 + Math.max(0, 600 - x) * 0.6, { seed: 4, color: "#183128", minR: 22, maxR: 56, fill: false, to: 620 });
    b += canopy(W, H, (x) => 720 + Math.max(0, x - 1180) * 0.6, { seed: 5, color: "#152B23", minR: 22, maxR: 56, fill: false, from: 1220 });
    b += `<path d="M0,760 L560,700 C520,900 420,1100 380,${H} L0,${H} Z" fill="#183128"/>`;
    b += `<path d="M${W},780 L1240,720 C1300,900 1380,1100 1420,${H} L${W},${H} Z" fill="#152B23"/>`;
    return frame(W, H, b);
  },

  // Market still life from above: fruit on a wooden table.
  market: () => {
    const W = 1600, H = 1200;
    let b = `<rect width="${W}" height="${H}" fill="#6B4A33"/>`;
    for (let i = 0; i < 12; i++) b += `<rect x="0" y="${i * 100}" width="${W}" height="96" fill="${i % 2 ? "#704E36" : "#664530"}"/><rect x="0" y="${i * 100 + 96}" width="${W}" height="4" fill="#4E3523"/>`;
    // woven tray
    b += `<circle cx="720" cy="600" r="420" fill="#C9A672"/><circle cx="720" cy="600" r="400" fill="none" stroke="#A9864F" stroke-width="10" stroke-dasharray="6 10"/>`;
    // papaya halves
    const papaya = (cx, cy, rot) => `<g transform="translate(${cx},${cy}) rotate(${rot})"><ellipse rx="170" ry="100" fill="#5D7B3A"/><ellipse rx="160" ry="90" fill="#E08A4F"/><ellipse rx="110" ry="46" fill="#C86A36"/>${Array.from({ length: 30 }, (_, i) => `<circle cx="${f(Math.cos(i * 2.3) * (20 + (i % 5) * 16))}" cy="${f(Math.sin(i * 2.3) * (10 + (i % 4) * 7))}" r="7" fill="#2A211B"/>`).join("")}</g>`;
    b += papaya(560, 460, -20) + papaya(860, 700, 15);
    // limes / passion fruit / pejibaye-like palm fruit
    const r = rng(6);
    for (let i = 0; i < 9; i++) b += `<circle cx="${f(820 + r() * 220)}" cy="${f(320 + r() * 160)}" r="${f(36 + r() * 8)}" fill="${i % 3 ? "#7E9A3E" : "#94AE4C"}"/>`;
    for (let i = 0; i < 7; i++) b += `<ellipse cx="${f(420 + r() * 220)}" cy="${f(760 + r() * 140)}" rx="38" ry="30" fill="${i % 2 ? "#C25A30" : "#D8763E"}"/>`;
    // leaf
    b += `<path d="M1180,180 Q1500,240 1560,520 Q1300,460 1180,180 Z" fill="#2F5A3F"/><path d="M1180,180 L1560,520" stroke="#6E9A72" stroke-width="3"/>`;
    // cup of coffee
    b += `<circle cx="1320" cy="900" r="120" fill="#E9E1D0"/><circle cx="1320" cy="900" r="88" fill="#3B2617"/><ellipse cx="1300" cy="880" rx="40" ry="18" fill="#6B4630" opacity=".7"/>`;
    return frame(W, H, b, { grain: 0.12 });
  },

  // A trail vanishing into the forest.
  trail: () => {
    const W = 1200, H = 1500;
    let b = sky(W, H, [[0, "#DCE2D7"], [1, "#C8D2C3"]]);
    b += ridges(W, H, { layers: 4, top: 380, bottom: 760, far: "#B7C4B5", near: "#2E4C3E", hazeColor: "#E8ECE4", seed: 707, amp: 0.05, canopyFrom: 0 });
    b += mist(W, 640, 200, "#EEF1EA", 0.6, "tm");
    b += `<path d="${fillBelow(W, H, (x) => 820 + Math.sin(x / 160) * 16)}" fill="#1D362C"/>`;
    b += `<path d="M330,${H} C440,1260 700,1160 640,1000 C600,900 640,860 612,822 L632,822 C680,870 660,930 720,1010 C840,1190 910,1320 1000,${H} Z" fill="#B49A74"/>`;
    b += `<g transform="translate(622,840) scale(.9)"><circle cx="0" cy="-58" r="8" fill="#2A2620"/><path d="M-9,-48 L9,-48 L11,-14 L-11,-14 Z" fill="#2A2620"/><path d="M-6,-14 L-10,14 M6,-14 L9,14" stroke="#2A2620" stroke-width="6" stroke-linecap="round"/><rect x="-14" y="-46" width="8" height="24" rx="3" fill="#8F5A3E"/></g>`;
    b += canopy(W, H, (x) => 900 + Math.max(0, 420 - x) * 0.9, { seed: 4, color: "#162C24", minR: 26, maxR: 64, fill: false, to: 420 });
    b += canopy(W, H, (x) => 920 + Math.max(0, x - 820) * 0.9, { seed: 5, color: "#132720", minR: 26, maxR: 64, fill: false, from: 860 });
    b += `<path d="M0,960 L400,930 C360,1150 260,1350 200,${H} L0,${H} Z" fill="#162C24"/>`;
    b += `<path d="M${W},980 L860,950 C960,1150 1080,1350 1120,${H} L${W},${H} Z" fill="#132720"/>`;
    b += emergent(90, H, 1250, 300, "#10221C", 15);
    b += emergent(1130, H, 1150, 260, "#10221C", 16);
    return frame(W, H, b);
  },
};
