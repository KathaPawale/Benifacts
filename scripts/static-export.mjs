// Turns the Node build into a plain static website for hosts such as Hostinger shared hosting.
// Run via `npm run build:static`; the upload-ready files end up in `hostinger-upload/`
// (plus `benifacts-hostinger.zip` when the `zip` command is available).
import { spawn, execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const PORT = 4199;
const OUT = "hostinger-upload";

const server = spawn("node", [".output/server/index.mjs"], {
  env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1" },
  stdio: "inherit",
});

try {
  let html = "";
  for (let attempt = 0; attempt < 60 && !html; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/`);
      if (!response.ok) throw new Error(`Homepage returned ${response.status}`);
      html = await response.text();
    } catch (error) {
      if (attempt === 59) throw error;
    }
  }

  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  cpSync(".output/public", OUT, { recursive: true });
  writeFileSync(`${OUT}/index.html`, html);
  // Service pages: one folder per service so /services/<slug>/ works on plain static hosting.
  const slugs = [...readFileSync("src/lib/services.ts", "utf8").matchAll(/^    slug: "([a-z-]+)"/gm)].map((m) => m[1]);
  for (const slug of slugs) {
    const response = await fetch(`http://127.0.0.1:${PORT}/services/${slug}`);
    if (!response.ok) throw new Error(`/services/${slug} returned ${response.status}`);
    mkdirSync(`${OUT}/services/${slug}`, { recursive: true });
    writeFileSync(`${OUT}/services/${slug}/index.html`, await response.text());
  }
  // Apache (Hostinger shared hosting): serve index.html for "/", cache hashed assets, compress text.
  writeFileSync(`${OUT}/.htaccess`, [
    "DirectoryIndex index.html",
    "Options -Indexes",
    "",
    "<IfModule mod_deflate.c>",
    "  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml",
    "</IfModule>",
    "",
    "<IfModule mod_expires.c>",
    "  ExpiresActive On",
    '  ExpiresByType text/html "access plus 0 seconds"',
    '  <FilesMatch "^assets/">',
    '    ExpiresDefault "access plus 1 year"',
    "  </FilesMatch>",
    "</IfModule>",
    "",
    "<FilesMatch \"\\.(js|css|woff|webp|jpg|png|mp4)$\">",
    "  <IfModule mod_headers.c>",
    '    Header set Cache-Control "public, max-age=2592000"',
    "  </IfModule>",
    "</FilesMatch>",
    "",
  ].join("\n"));

  if (existsSync("benifacts-hostinger.zip")) rmSync("benifacts-hostinger.zip");
  try {
    execFileSync("zip", ["-qr", "../benifacts-hostinger.zip", "."], { cwd: OUT });
    console.log(`\nStatic site ready: ${OUT}/ and benifacts-hostinger.zip`);
  } catch {
    console.log(`\nStatic site ready: ${OUT}/ (zip it to upload)`);
  }
} finally {
  server.kill();
}
