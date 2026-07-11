import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

const config = {
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || ""
};

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("index.html", "dist/index.html");
cpSync("app.js", "dist/app.js");
cpSync("styles.css", "dist/styles.css");
cpSync("sw.js", "dist/sw.js");
cpSync("manifest.webmanifest", "dist/manifest.webmanifest");
cpSync("kill-sw.html", "dist/kill-sw.html");
cpSync("assets", "dist/assets", { recursive: true });

writeFileSync(
  "dist/config.js",
  `window.VOLUNTEER_CONFIG = ${JSON.stringify(config, null, 2)};\n`
);
