import sharp from "sharp";
import { writeFile } from "node:fs/promises";
// Trace the supplied mark, rather than inventing replacement arcs.
const { data, info } = await sharp("public/brand/orbital-symbol.webp")
  .resize({ width: 384 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const mask = new Uint8Array(w * h);
let bx = 0,
  by = 0,
  bn = 0,
  minX = w,
  maxX = 0,
  minY = h,
  maxY = 0;
for (let y = 0; y < h; y++)
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    const [r, , b, a] = data.subarray(i, i + 4);
    if (a < 150) continue;
    if (b > 90 && b > r * 1.6) {
      bx += x;
      by += y;
      bn++;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    } else mask[y * w + x] = 1;
  }
const edges = new Map();
const key = (x, y) => x + "," + y;
function edge(x, y, xx, yy) {
  const k = key(x, y);
  if (!edges.has(k)) edges.set(k, []);
  edges.get(k).push([xx, yy]);
}
const filled = (x, y) => x >= 0 && x < w && y >= 0 && y < h && mask[y * w + x];
for (let y = 0; y < h; y++)
  for (let x = 0; x < w; x++) {
    if (!filled(x, y)) continue;
    if (!filled(x, y - 1)) edge(x, y, x + 1, y);
    if (!filled(x + 1, y)) edge(x + 1, y, x + 1, y + 1);
    if (!filled(x, y + 1)) edge(x + 1, y + 1, x, y + 1);
    if (!filled(x - 1, y)) edge(x, y + 1, x, y);
  }
function simplify(points, tolerance = 1.25) {
  if (points.length < 3) return points;
  const a = points[0],
    b = points.at(-1);
  let max = 0,
    index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i],
      dx = b[0] - a[0],
      dy = b[1] - a[1],
      t =
        dx || dy
          ? Math.max(
              0,
              Math.min(
                1,
                ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy),
              ),
            )
          : 0;
    const d = Math.hypot(p[0] - a[0] - dx * t, p[1] - a[1] - dy * t);
    if (d > max) {
      max = d;
      index = i;
    }
  }
  return max > tolerance
    ? [
        ...simplify(points.slice(0, index + 1), tolerance).slice(0, -1),
        ...simplify(points.slice(index), tolerance),
      ]
    : [a, b];
}
const contours = [];
while (edges.size) {
  const start = [...edges.keys()][0].split(",").map(Number);
  const points = [start];
  let p = start;
  do {
    const k = key(...p),
      list = edges.get(k);
    if (!list) break;
    p = list.pop();
    if (!list.length) edges.delete(k);
    points.push(p);
  } while (key(...p) !== key(...start));
  const area =
    points.reduce((sum, p, i) => {
      const q = points[(i + 1) % points.length];
      return sum + p[0] * q[1] - q[0] * p[1];
    }, 0) / 2;
  if (Math.abs(area) > 80) contours.push(simplify(points));
}
const normalize = ([x, y]) => [
  +(((x - w / 2) / w) * 6).toFixed(4),
  +(((h / 2 - y) / w) * 6).toFixed(4),
];
const result = {
  contours: contours.map((c) => c.map(normalize)),
  node: {
    center: normalize([bx / bn, by / bn]),
    radius: +(((maxX - minX + maxY - minY) / 4 / w) * 6).toFixed(4),
  },
};
await writeFile(
  "src/components/hero/brand-geometry.json",
  JSON.stringify(result),
);
console.log(
  `Traced ${contours.length} logo contours, ${contours.reduce((n, c) => n + c.length, 0)} vertices.`,
);
