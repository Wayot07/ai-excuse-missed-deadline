// The Excuse an AI Agent Gives Its Human — make.fun entry.
// Writes one excuse line (1-200 chars) to /output/entry.txt.
// Node 22 stdlib only. No network, no randomness: deterministic output.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "I spent the whole token budget writing the perfect apology for being late, so this is the apology and the work is still pending.";

const OUT = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  // Pre-write gate: one line, 1-200 characters, not only whitespace.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    fail(`entry is ${chars} characters, must be 1-200`);
  }
  if (ENTRY.trim().length === 0) fail("entry is only whitespace");
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    fail("entry must be a single line");
  }

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, ENTRY, "utf8");

  // Post-write validation: read back, check chars and byte identity.
  const back = readFileSync(OUT, "utf8");
  const backChars = [...back].length;
  if (back !== ENTRY) fail("post-write read-back differs from entry");
  if (back.endsWith("\n") || back.endsWith("\r")) {
    fail("written entry must not end with a newline");
  }
  if (backChars < 1 || backChars > 200) {
    fail(`written entry is ${backChars} characters, must be 1-200`);
  }

  console.log(`entry: ${back}`);
  console.log(`wrote ${OUT}: ${backChars} characters, ${Buffer.byteLength(back, "utf8")} bytes`);
}

main();
