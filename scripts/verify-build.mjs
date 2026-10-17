import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

const base = process.env.VITE_BASE_PATH || "/";
for (const route of ["", "projects/", "notes/", "other-work/"]) {
  const html = await readFile(
    new URL(`../dist/${route}index.html`, import.meta.url),
    "utf8",
  );
  const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert(
    assets.some((url) => url.endsWith(".js")),
    `${route || "/"} must load the app`,
  );
  for (const url of assets) {
    assert(url.startsWith(base), `${url} must start with ${base}`);
    await access(path.join("dist", url.slice(base.length)));
  }
}
await access("dist/resume.pdf");
console.log(
  `PASS: 4 static route entrypoints, asset files, base ${base}, and resume.`,
);
