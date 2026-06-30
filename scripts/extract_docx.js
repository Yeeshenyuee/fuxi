#!/usr/bin/env node
// Extract text + image references from an UNZIPPED .docx directory.
// Usage:
//   unzip -o -q file.docx -d /tmp/docx_extract
//   node extract_docx.js /tmp/docx_extract
// Output: each paragraph's text on a line; paragraphs containing images get a
// trailing  [IMG:image3.png,image4.png]  with rId resolved to real media files.
// Then Read the listed /word/media/imageN.png files (esp. formulas, diagrams).

const fs = require("fs");
const path = require("path");

const root = process.argv[2];
if (!root) { console.error("usage: node extract_docx.js <unzipped-docx-dir>"); process.exit(1); }
const wordDir = fs.existsSync(path.join(root, "word")) ? path.join(root, "word") : root;

// rId -> media filename
const relsPath = path.join(wordDir, "_rels", "document.xml.rels");
const rel = {};
if (fs.existsSync(relsPath)) {
  const r = fs.readFileSync(relsPath, "utf8");
  for (const m of r.matchAll(/Id="(rId\d+)"[^>]*Target="([^"]+)"/g)) {
    rel[m[1]] = m[2].replace(/^.*\//, ""); // keep just imageN.png
  }
}

const xml = fs.readFileSync(path.join(wordDir, "document.xml"), "utf8");
const out = [];
for (const p of xml.split(/<\/w:p>/)) {
  const texts = [...p.matchAll(/<(?:w|m):t[^>]*>([\s\S]*?)<\/(?:w|m):t>/g)].map(x => x[1]);
  const imgs = [...p.matchAll(/r:embed="(rId\d+)"/g)].map(x => rel[x[1]] || x[1]);
  const line = texts.join("")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
  if (line.trim() || imgs.length) out.push(line + (imgs.length ? "  [IMG:" + imgs.join(",") + "]" : ""));
}
console.log(out.join("\n"));
console.error(`\n[media dir] ${path.join(wordDir, "media")}  (Read the imageN.png referenced above)`);
