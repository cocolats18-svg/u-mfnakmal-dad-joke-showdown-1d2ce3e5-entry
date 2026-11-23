import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A single original dad joke, told out loud: a father, a son, and a
// ceiling fan. The pun lands cleanly and the punchline arrives at the end.
// The joke is 110 characters, well within the 1-200 cap, and contains no
// trailing newline: the file holds exactly the joke, nothing else.
const TEXT =
  "I asked my son why he was staring at the ceiling fan. He said, " +
  "'I'm a big fan.' I said, 'Son, that's my line.'";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be 1-200 Unicode code points and not only whitespace.
// Counted as code points ([...TEXT]), not UTF-16 code units, per the rules.
function assertValidEntry(text: string): number {
  const codePoints = [...text].length;
  if (codePoints < 1 || codePoints > 200 || text.trim() === "") {
    throw new Error(`entry text is ${codePoints} code points; must be 1-200 and non-blank`);
  }
  return codePoints;
}

const codePoints = assertValidEntry(TEXT);

// Output: the grader reads /output/entry.txt (or $MAKEFUN_OUTPUT_DIR when set).
// Create the directory first, tolerating a pre-existing path, then write
// the entry as UTF-8. The written text is byte-identical to TEXT above.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, { encoding: "utf8", flag: "w" });
