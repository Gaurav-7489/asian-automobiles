// Launch gate (spec 26.6 / 28.1). Run after `NEXT_PUBLIC_FACT_MODE=strict npm run build`.
// Fails if facts are still provisional or banned wording / placeholders appear in the built HTML.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

let failed = false;
const fail = (m) => { failed = true; console.error("✗", m); };

const business = readFileSync("content/business.ts", "utf8");
const provisional = [];
let key = null;
for (const line of business.split("\n")) {
  const k = line.match(/^\s{2}(\w+): \{/);
  if (k) key = k[1];
  if (key && line.includes('status: "provisional"') && !provisional.includes(key)) provisional.push(key);
}
if (provisional.length) fail(`Facts still provisional (owner sign-off needed): ${provisional.join(", ")}`);

const banned = [/PROVISIONAL/, /TODO/, /lorem/i, /\{\{/, /\b3D\b/, /laser/i, /computeri[sz]ed/i, /certified/i, /guarantee/i, /\bbest in\b/i, /#1\b/, /\blicensed\b.*\bour workshop/i];
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const html = walk(".next/server/app").filter((f) => f.endsWith(".html"));
if (!html.length) fail("No built HTML found – run the build first.");
for (const file of html) {
  const text = readFileSync(file, "utf8").replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  for (const re of banned) if (re.test(text)) fail(`${file}: matches ${re}`);
}
console.log(failed ? "\nLaunch check FAILED" : `Launch check passed (${html.length} pages).`);
process.exit(failed ? 1 : 0);
