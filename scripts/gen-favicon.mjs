/**
 * Generates favicon.ico with 16x16 and 32x32 PNG images embedded.
 * Design: green rounded-rect background with white bidirectional arrows.
 * Run: node scripts/gen-favicon.mjs
 */
import { deflateSync } from 'zlib';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));

// ── pixel drawing helpers ─────────────────────────────────────────────────────

function createCanvas(w, h) {
  const data = new Uint8Array(w * h * 4); // RGBA
  return {
    w, h, data,
    set(x, y, r, g, b, a = 255) {
      if (x < 0 || x >= w || y < 0 || y >= h) return;
      const i = (y * w + x) * 4;
      data[i] = r; data[i+1] = g; data[i+2] = b; data[i+3] = a;
    },
    fill(r, g, b, a = 255) {
      for (let i = 0; i < w * h * 4; i += 4) {
        data[i] = r; data[i+1] = g; data[i+2] = b; data[i+3] = a;
      }
    },
    blend(x, y, r, g, b, alpha) {
      if (x < 0 || x >= w || y < 0 || y >= h) return;
      const i = (y * w + x) * 4;
      const a = alpha / 255;
      data[i]   = Math.round(data[i]   * (1-a) + r * a);
      data[i+1] = Math.round(data[i+1] * (1-a) + g * a);
      data[i+2] = Math.round(data[i+2] * (1-a) + b * a);
      data[i+3] = Math.min(255, data[i+3] + alpha);
    },
  };
}

// Filled circle with anti-aliasing
function circle(cv, cx, cy, r, R, G, B, A = 255) {
  for (let y = Math.floor(cy - r - 1); y <= Math.ceil(cy + r + 1); y++) {
    for (let x = Math.floor(cx - r - 1); x <= Math.ceil(cx + r + 1); x++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const alpha = Math.max(0, Math.min(1, r + 0.5 - dist));
      if (alpha > 0) cv.blend(x, y, R, G, B, Math.round(A * alpha));
    }
  }
}

// Rounded rectangle (filled)
function roundRect(cv, x0, y0, x1, y1, radius, R, G, B, A = 255) {
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      // compute distance to nearest corner
      const cx = Math.max(x0 + radius, Math.min(x1 - radius, x));
      const cy = Math.max(y0 + radius, Math.min(y1 - radius, y));
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const alpha = Math.max(0, Math.min(1, radius + 0.5 - dist));
      if (alpha > 0) cv.blend(x, y, R, G, B, Math.round(A * alpha));
    }
  }
}

// Draw a filled pixel-art arrow: → pointing right
// pts: array of [x,y] center pixel positions that form the arrow shape
function drawPixels(cv, pts, R, G, B, A = 255) {
  for (const [x, y] of pts) cv.blend(x, y, R, G, B, A);
}

// ── icon design ───────────────────────────────────────────────────────────────

const BG  = [0x1d, 0x6e, 0x56]; // accent green
const FG  = [0xff, 0xff, 0xff]; // white

function drawIcon32(cv) {
  // Background: full rounded rect
  roundRect(cv, 0, 0, 31, 31, 6, ...BG);

  // Two horizontal arrows: ← (top) and → (bottom)
  // Using 3-pixel-wide strokes for readability at 32px

  const arrowW  = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
  const arrowNW = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

  // → arrow at y=10 (shaft + head)
  for (const x of arrowW) {
    cv.blend(x, 10, ...FG, 255);
    cv.blend(x, 11, ...FG, 255);
    cv.blend(x, 12, ...FG, 255);
  }
  // arrowhead →
  const hd1 = [[25,8],[25,9],[26,9],[27,10],[27,11],[27,12],[26,13],[25,13],[25,14]];
  for (const [x,y] of hd1) cv.blend(x, y, ...FG, 255);

  // ← arrow at y=19 (shaft + head)
  for (const x of arrowW) {
    cv.blend(x, 19, ...FG, 255);
    cv.blend(x, 20, ...FG, 255);
    cv.blend(x, 21, ...FG, 255);
  }
  // arrowhead ←
  const hd2 = [[6,17],[6,18],[5,18],[4,19],[4,20],[4,21],[5,22],[6,22],[6,23]];
  for (const [x,y] of hd2) cv.blend(x, y, ...FG, 255);
}

function drawIcon16(cv) {
  // Background
  roundRect(cv, 0, 0, 15, 15, 3, ...BG);

  // → at y=4
  for (let x = 2; x <= 12; x++) {
    cv.blend(x, 4, ...FG, 255);
    cv.blend(x, 5, ...FG, 255);
  }
  // head →
  for (const [x,y] of [[11,3],[12,4],[13,4],[13,5],[12,5],[11,6]]) cv.blend(x, y, ...FG, 255);

  // ← at y=9
  for (let x = 3; x <= 13; x++) {
    cv.blend(x, 9, ...FG, 255);
    cv.blend(x, 10, ...FG, 255);
  }
  // head ←
  for (const [x,y] of [[4,8],[3,9],[2,9],[3,10],[2,10],[4,11]]) cv.blend(x, y, ...FG, 255);
}

// ── PNG encoder ───────────────────────────────────────────────────────────────

function crc32(buf) {
  let c = 0xffffffff;
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let v = i;
      for (let j = 0; j < 8; j++) v = (v & 1) ? (0xedb88320 ^ (v >>> 1)) : (v >>> 1);
      t[i] = v;
    }
    return t;
  })());
  for (const b of buf) c = table[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput));
  return Buffer.concat([lenBuf, typeBytes, data, crcBuf]);
}

function encodePng(canvas) {
  const { w, h, data } = canvas;
  const sig = Buffer.from([137,80,78,71,13,10,26,10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  // Build raw scanlines (filter byte 0 = None per row)
  const raw = Buffer.alloc(h * (1 + w * 4));
  for (let y = 0; y < h; y++) {
    raw[y * (1 + w * 4)] = 0; // filter type None
    for (let x = 0; x < w; x++) {
      const src = (y * w + x) * 4;
      const dst = y * (1 + w * 4) + 1 + x * 4;
      raw[dst]   = data[src];
      raw[dst+1] = data[src+1];
      raw[dst+2] = data[src+2];
      raw[dst+3] = data[src+3];
    }
  }

  const compressed = deflateSync(raw, { level: 9 });

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── ICO assembler ─────────────────────────────────────────────────────────────

function buildIco(images) {
  // images: [{size, png}]
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);           // reserved
  header.writeUInt16LE(1, 2);           // type: icon
  header.writeUInt16LE(images.length, 4);

  const dirEntrySize = 16;
  let offset = 6 + images.length * dirEntrySize;
  const entries = [];

  for (const { size, png } of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry[0] = size === 256 ? 0 : size; // width
    entry[1] = size === 256 ? 0 : size; // height
    entry[2] = 0;   // color count (0 = no palette)
    entry[3] = 0;   // reserved
    entry.writeUInt16LE(1, 4);           // planes
    entry.writeUInt16LE(32, 6);          // bit count
    entry.writeUInt32LE(png.length, 8);  // size in bytes
    entry.writeUInt32LE(offset, 12);     // offset
    entries.push(entry);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(i => i.png)]);
}

// ── main ──────────────────────────────────────────────────────────────────────

const cv32 = createCanvas(32, 32);
drawIcon32(cv32);
const png32 = encodePng(cv32);

const cv16 = createCanvas(16, 16);
drawIcon16(cv16);
const png16 = encodePng(cv16);

const ico = buildIco([
  { size: 16, png: png16 },
  { size: 32, png: png32 },
]);

const out = resolve(__dir, '../src/favicon.ico');
writeFileSync(out, ico);
console.log(`✓ favicon.ico written (${ico.length} bytes) → ${out}`);
