import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const rootDirs = ["app", "components", "lib"];
const forbiddenPatterns = [
  /from\s+["'].*?mock-data["']/i,
  /from\s+["'].*?\/mock-data["']/i,
  /import\s+["'].*?mock-data["']/i,
  /require\(\s*["'].*?mock-data["']\s*\)/i,
];
const excludedDirSegments = [
  "node_modules",
  ".next",
  "lib/mock-data",
  "app/dashboard/[slug]/dashboards",
];

const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (excludedDirSegments.some((segment) => fullPath.includes(segment))) continue;
      walk(fullPath);
      continue;
    }

    if (/\.(ts|tsx|js|jsx)$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) {
      files.push(fullPath);
    }
  }
}

for (const dir of rootDirs) {
  const fullDir = path.join(repoRoot, dir);
  if (fs.existsSync(fullDir)) walk(fullDir);
}

const violations = [];

for (const file of files) {
  const relPath = path.relative(repoRoot, file).split(path.sep).join("/");
  const content = fs.readFileSync(file, "utf8");

  if (excludedDirSegments.some((segment) => relPath.includes(segment))) continue;
  if (forbiddenPatterns.some((pattern) => pattern.test(content))) {
    violations.push(relPath);
  }
}

if (violations.length > 0) {
  console.error("Production mock-data import guard failed:");
  for (const violation of violations) {
    console.error(` - ${violation}`);
  }
  process.exit(1);
}

console.warn("Production mock-data import guard passed.");
