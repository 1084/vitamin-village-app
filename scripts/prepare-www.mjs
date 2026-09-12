// Builds www/ from the web version of Vitamin Village.
//
// The single source of truth for the game stays in the storefront repo
// (1084.github.io/vitamin-village). This script copies it into www/, then
// makes the two changes the native app needs:
//   1. drops the service-worker registration (Capacitor bundles the files, so
//      there is nothing to cache and a stale SW would only cause confusion);
//   2. adds native/native.js, which wires up haptics and saves progress.
//
// Usage:  node scripts/prepare-www.mjs [path-to-vitamin-village-folder]
// Default source: ../1084.github.io/vitamin-village (sibling checkout).

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const src = resolve(process.argv[2] || resolve(root, "../1084.github.io/vitamin-village"));
const out = resolve(root, "www");

if (!existsSync(resolve(src, "index.html"))) {
  console.error(`No index.html at ${src}\nPass the path to the vitamin-village folder as the first argument.`);
  process.exit(1);
}

// Plain recursive copy (fs.cpSync trips over permission bits on some mounted volumes).
function copyDir(from, to) {
  mkdirSync(to, { recursive: true });
  for (const name of readdirSync(from)) {
    const a = resolve(from, name), b = resolve(to, name);
    if (statSync(a).isDirectory()) copyDir(a, b); else copyFileSync(a, b);
  }
}
rmSync(out, { recursive: true, force: true });
copyDir(src, out);
rmSync(resolve(out, "sw.js"), { force: true });

let html = readFileSync(resolve(out, "index.html"), "utf8");

// 1. Remove the service-worker registration block.
const swBlock = /if \("serviceWorker" in navigator\) \{[\s\S]*?\n\}\n/;
if (swBlock.test(html)) {
  html = html.replace(swBlock, "/* service worker not used in the native app */\n");
} else {
  console.warn("warning: service-worker block not found; index.html may have changed");
}

// 2. Load the native bridge after the game script.
if (!html.includes("native.js")) {
  html = html.replace("</body>", '<script src="native.js"></script>\n</body>');
}

writeFileSync(resolve(out, "index.html"), html);
copyFileSync(resolve(root, "native/native.js"), resolve(out, "native.js"));

console.log(`www/ built from ${src}`);
