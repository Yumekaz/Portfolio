// Static hosts need a physical entry for each public route (including reloads).
import { mkdir, readFile, writeFile } from "node:fs/promises";
const html = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
for (const route of ["projects", "notes", "other-work"]) {
  const directory = new URL(`../dist/${route}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
}
