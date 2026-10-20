// Extracts base64 images from a Google Docs markdown export into public/lectures/<id>/.
// Usage: node scripts/extract-images.mjs <source.md> <lectureId>
// Example: node scripts/extract-images.mjs source/01-words-that-connect.md 01
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const [source, lectureId] = process.argv.slice(2);
if (!source || !lectureId) {
  console.error("Usage: node scripts/extract-images.mjs <source.md> <lectureId>");
  process.exit(1);
}

const outDir = join("public", "lectures", lectureId);
mkdirSync(outDir, { recursive: true });

const pattern = /^\[(image\d+)\]:\s*<?data:image\/(\w+);base64,([A-Za-z0-9+/=]+)>?\s*$/gm;
const text = readFileSync(source, "utf8");
let count = 0;
for (const [, name, ext, data] of text.matchAll(pattern)) {
  const file = join(outDir, `${name}.${ext === "jpeg" ? "jpg" : ext}`);
  writeFileSync(file, Buffer.from(data, "base64"));
  console.log(`wrote ${file}`);
  count++;
}
console.log(`${count} image(s) extracted`);
