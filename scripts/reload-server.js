import livereload from "livereload";
import path from "path";

const lrserver = livereload.createServer({
  exts: ["js", "css", "html"],
  delay: 200
});

// Watch all system dist directories
lrserver.watch(path.join(process.cwd(), "systems"));
console.log("LiveReload watching systems/*/dist...");
