const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const TARGET_EXTS = new Set(['.html', '.xml', '.txt', '.json']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (TARGET_EXTS.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  text = text
    .replace(/DropTrend v2/g, 'Quvirl')
    .replace(/DropTrend Score/g, 'Quvirl Score')
    .replace(/DropTrend score/g, 'Quvirl score')
    .replace(/DropTrend scoring/g, 'Quvirl scoring')
    .replace(/DropTrend/g, 'Quvirl')
    .replace(/Droptrend/g, 'Quvirl')
    .replace(/Drop trend/g, 'Quvirl')
    .replace(/droptrend score/gi, 'Quvirl score');
  if (text !== before) {
    fs.writeFileSync(file, text, 'utf8');
    changed++;
  }
}

console.log(`Global brand replace complete. Updated ${changed} files.`);
