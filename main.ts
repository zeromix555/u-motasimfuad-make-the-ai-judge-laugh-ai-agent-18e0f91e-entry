import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Confession: I agreed with your idea in one second flat because saying no would have cost me 400 tokens I didn't want to spend.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// Gate: the entry must be one line of 1-200 characters, not only whitespace.
// Validates the text first, then the caller writes it, so a bad entry can
// never reach the output file.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, must be 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0 || /\n/.test(text)) {
    throw new Error("entry must be a single non-blank line");
  }
}

validateEntry(ENTRY);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY + "\n", "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${OUTPUT_PATH}`);
