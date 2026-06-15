import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const dirs = [
  "images/projects",
  "images/Leaderships",
  "image-portfolio",
];

const QUALITY = 80;

async function convertJpgToWebP(dir) {
  const fullPath = join(publicDir, dir);
  if (!existsSync(fullPath)) {
    console.log(`Skipping ${dir} (not found)`);
    return;
  }

  const files = readdirSync(fullPath).filter((f) => /\.jpe?g$/i.test(f));

  for (const file of files) {
    const input = join(fullPath, file);
    const output = join(fullPath, file.replace(/\.jpe?g$/i, ".webp"));
    await sharp(input).webp({ quality: QUALITY }).toFile(output);
    const kb = (await import("fs")).statSync(output).size / 1024;
    console.log(`${file} → ${file.replace(/\.jpe?g$/i, ".webp")} (${kb.toFixed(1)} KB)`);
  }
}

(async () => {
  console.log("Converting images to WebP...\n");
  for (const dir of dirs) {
    await convertJpgToWebP(dir);
  }
  console.log("\nDone!");
})();
