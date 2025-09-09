import fs from "fs-extra";
import path from "path";

const configPath = "foundryconfig.json";
if (!fs.existsSync(configPath)) {
  console.error("Missing foundryconfig.json. Please create it.");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const systemJson = JSON.parse(fs.readFileSync("static/system.json", "utf-8"));
const systemName = systemJson.id;

const srcDist = path.resolve("dist");
const dest = path.resolve(config.dataPath, "modules", systemName);

fs.ensureDirSync(dest);
fs.copySync(srcDist, dest, { overwrite: true });
fs.copySync("static", dest, { overwrite: true });

console.log(`✅ Deployed '${systemName}' to Foundry at: ${dest}`);
