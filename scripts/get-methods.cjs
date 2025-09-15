// clean-methods.js
// Usage: node clean-methods.js input.txt output.txt

const fs = require("fs");

if (process.argv.length < 4) {
  console.error("Usage: node clean-methods.js <input.txt> <output.txt>");
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];
const content = fs.readFileSync(inputFile, "utf8");

// Capture method name and parameter block (works across new lines)
const methodRegex = /^\s*([a-zA-Z0-9_]+)\s*\(([^)]*)\)/gm;

// Split params by top-level commas (ignore commas inside <>, (), [])
function splitParamsTopLevel(paramStr) {
  const parts = [];
  let current = "";
  let angle = 0,
    paren = 0,
    square = 0;
  for (let i = 0; i < paramStr.length; i++) {
    const ch = paramStr[i];

    if (ch === "<") {
      angle++;
      current += ch;
      continue;
    }
    if (ch === ">") {
      if (angle > 0) angle--;
      current += ch;
      continue;
    }
    if (ch === "(") {
      paren++;
      current += ch;
      continue;
    }
    if (ch === ")") {
      if (paren > 0) paren--;
      current += ch;
      continue;
    }
    if (ch === "[") {
      square++;
      current += ch;
      continue;
    }
    if (ch === "]") {
      if (square > 0) square--;
      current += ch;
      continue;
    }

    // Only split on commas when not inside angle/paren/square brackets
    if (ch === "," && angle === 0 && paren === 0 && square === 0) {
      parts.push(current);
      current = "";
      continue;
    }

    current += ch;
  }

  if (current.trim() !== "") parts.push(current);
  return parts;
}

function extractParamName(token) {
  // Remove leading/trailing whitespace
  const t = token.trim();

  // Handle rest params: ...args
  const restMatch = t.match(/^(\.{3})?([A-Za-z0-9_]+)/);
  if (restMatch) {
    return (restMatch[1] || "") + restMatch[2];
  }

  // Fallback to first word-like chunk
  const fallback = t.match(/[A-Za-z0-9_]+/);
  return fallback ? fallback[0] : t;
}

let methodsMap = new Map();
let match;

while ((match = methodRegex.exec(content)) !== null) {
  let methodName = match[1];
  let rawParams = match[2] || "";

  // Remove generics from method name if present (e.g., name<T>)
  methodName = methodName.replace(/<.*?>/g, "").trim();

  // Split params safely, then extract only parameter names
  const rawParamTokens = splitParamsTopLevel(rawParams);
  const paramNames = rawParamTokens
    .map((t) => extractParamName(t))
    .filter((n) => n && n.length > 0)
    .join(", ");

  // Keep only the first occurrence of a method name (preserves earlier behavior)
  if (!methodsMap.has(methodName)) {
    methodsMap.set(
      methodName,
      `${methodName}(${paramNames}) {
    console.log(\`RWK: \${this.document.documentName}\`);
};`
    );
  }
}

// Write output
fs.writeFileSync(outputFile, Array.from(methodsMap.values()).join("\n\n"), "utf8");
console.log(`✅ Cleaned methods written to ${outputFile}`);
