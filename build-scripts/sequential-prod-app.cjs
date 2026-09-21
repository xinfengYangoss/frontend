process.env.NODE_ENV = "production";

const fs = require("fs");
const path = require("path");
const rspack = require("@rspack/core");
const { createAppConfig } = require("./rspack.cjs");

const copyUnhashed = (dir) => {
  const manifestPath = path.join(dir, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    console.warn("no manifest in", dir);
    return;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  for (const [name, url] of Object.entries(manifest)) {
    const hashed = path.basename(String(url));
    const src = path.join(dir, hashed);
    const dest = path.join(dir, name);
    if (fs.existsSync(src) && path.resolve(src) !== path.resolve(dest)) {
      fs.copyFileSync(src, dest);
      console.log("copied", dest);
    }
  }
};

const run = (latestBuild) =>
  new Promise((resolve, reject) => {
    const label = latestBuild ? "modern" : "es5";
    console.log(`Compiling ${label}...`);
    rspack(
      createAppConfig({
        isProdBuild: true,
        latestBuild,
        isStatsBuild: false,
        isTestBuild: false,
      }),
      (err, stats) => {
        if (err) {
          reject(err);
          return;
        }
        if (stats.hasErrors()) {
          reject(new Error(stats.toString("errors-only")));
          return;
        }
        console.log(`Done ${label} @ ${new Date().toLocaleTimeString()}`);
        copyUnhashed(
          latestBuild
            ? "hass_frontend/frontend_latest"
            : "hass_frontend/frontend_es5"
        );
        resolve();
      }
    );
  });

(async () => {
  const only = process.argv[2];
  if (only === "es5") {
    await run(false);
  } else if (only === "modern") {
    await run(true);
  } else {
    await run(false);
    await run(true);
  }
  console.log("ALL OK");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
