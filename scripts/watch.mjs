import chokidar from "chokidar";
import WebSocket from "ws";

async function getFoundryTab() {
  const res = await fetch("http://localhost:9222/json");
  const tabs = await res.json();

  // adjust port if Foundry isn’t on :30000
  return tabs.find(tab => tab.url.includes("localhost:30000"));
}

async function reloadFoundry() {
  const tab = await getFoundryTab();
  if (!tab) {
    console.log("❌ Foundry tab not found");
    return;
  }

  const ws = new WebSocket(tab.webSocketDebuggerUrl);

  ws.on("open", () => {
    console.log("🔄 Reloading Foundry tab...");
    ws.send(JSON.stringify({
      id: 1,
      method: "Page.reload",
      params: { ignoreCache: true }
    }));
    ws.close();
  });
}

const watcher = chokidar.watch(
  [
    "F:/RPG/Foundry/Foundry-Data/FVTT-Dev-Data/Data/systems/rwk-rmc/**/*.mjs",
    "F:/RPG/Foundry/Foundry-Data/FVTT-Dev-Data/Data/systems/rwk-rmc/**/*.js",
    "F:/RPG/Foundry/Foundry-Data/FVTT-Dev-Data/Data/systems/rwk-rmc/**/*.json",
    "F:/RPG/Foundry/Foundry-Data/FVTT-Dev-Data/Data/systems/rwk-rmc/**/*.scss"
  ],
  {
    ignoreInitial: true,
    persistent: true,
    usePolling: true,
    interval: 100,
    binaryInterval: 300
  }
);

watcher.on("ready", () => {
  console.log("👀 Watching for changes...");
});

watcher.on("ready", async (path) => {
  console.log(`📂 File changed: ${path}`);
  await reloadFoundry();
});
