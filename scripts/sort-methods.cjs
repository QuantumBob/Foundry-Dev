// node sort-methods.cjs ../txt-files/methods.txt ../txt-files/sorted.txt
// node sort-methods.cjs ../txt-files/sheet-out2.txt ../txt-files/sheet-out-sorted.txt
// node sort-methods.cjs ../txt-files/datamodel-out2.txt ../txt-files/datamodel-out-sorted.txt
// node sort-methods.cjs ../txt-files/item-out2.txt ../txt-files/item-out-sorted.txt

const fs = require("fs");

// Get filenames from CLI args
const [, , inputFile, outputFile] = process.argv;

if (!inputFile || !outputFile) {
  console.error("Usage: node sort-methods.js <inputFile> <outputFile>");
  process.exit(1);
}

// Read input file
const content = fs.readFileSync(inputFile, "utf8");

// Split into method blocks (each ending with "};")
const methods = content
  .split("};")
  .map((m) => m.trim())
  .filter((m) => m.length > 0)
  .map((m) => m + "};"); // re-add the ending

// Sorting logic
methods.sort((a, b) => {
  const nameA = a.match(/^([a-zA-Z0-9_]+)/)[0];
  const nameB = b.match(/^([a-zA-Z0-9_]+)/)[0];

  const isAUnderscore = nameA.startsWith("_");
  const isBUnderscore = nameB.startsWith("_");

  if (isAUnderscore && !isBUnderscore) return -1;
  if (!isAUnderscore && isBUnderscore) return 1;

  return nameA.localeCompare(nameB);
});

// Write to output file
fs.writeFileSync(outputFile, methods.join("\n\n"), "utf8");

console.log(`✅ Methods sorted and written to ${outputFile}`);
