/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const ROOT_DIR = process.cwd();
const SOURCE_DIR = path.join(ROOT_DIR, "src", "assets", "images", "original");
const OUTPUT_DIR = path.join(ROOT_DIR, "public", "images", "optimized");
const MANIFEST_PATH = path.join(
  ROOT_DIR,
  "src",
  "assets",
  "images",
  "optimized-manifest.json",
);

const IMAGE_WIDTHS = [480, 768, 1200, 1600];
const OUTPUT_QUALITY = {
  webp: 80,
  avif: 55,
};
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugifyPath(relativeFilePath) {
  return relativeFilePath
    .replace(/\\/g, "/")
    .replace(/\.[^.]+$/, "")
    .split("/")
    .map((segment) =>
      segment
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    )
    .filter(Boolean)
    .join("-");
}

function walkFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    return SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
      ? [fullPath]
      : [];
  });
}

function getTargetWidths(originalWidth) {
  const widths = IMAGE_WIDTHS.filter((width) => width < originalWidth);
  widths.push(originalWidth);
  return [...new Set(widths)].sort((a, b) => a - b);
}

async function generateVariant({ inputPath, outputPath, width, format }) {
  let pipeline = sharp(inputPath).resize({
    width,
    withoutEnlargement: true,
    fit: "inside",
  });

  if (format === "webp") {
    pipeline = pipeline.webp({
      quality: OUTPUT_QUALITY.webp,
      effort: 6,
    });
  } else if (format === "avif") {
    pipeline = pipeline.avif({
      quality: OUTPUT_QUALITY.avif,
      effort: 7,
    });
  }

  await pipeline.toFile(outputPath);
}

async function main() {
  ensureDir(path.dirname(MANIFEST_PATH));
  ensureDir(SOURCE_DIR);

  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  ensureDir(OUTPUT_DIR);

  const sourceFiles = walkFiles(SOURCE_DIR);
  const manifest = {};

  for (const inputPath of sourceFiles) {
    const relativeFilePath = path.relative(SOURCE_DIR, inputPath);
    const assetId = slugifyPath(relativeFilePath);
    const metadata = await sharp(inputPath).metadata();

    if (!metadata.width || !metadata.height) {
      console.warn(`Skipping ${relativeFilePath}: missing width/height metadata`);
      continue;
    }

    const widths = getTargetWidths(metadata.width);
    const formats = {
      avif: [],
      webp: [],
    };

    for (const width of widths) {
      for (const format of ["avif", "webp"]) {
        const fileName = `${assetId}-${width}.${format}`;
        const outputPath = path.join(OUTPUT_DIR, fileName);

        await generateVariant({
          inputPath,
          outputPath,
          width,
          format,
        });

        formats[format].push({
          src: `/images/optimized/${fileName}`,
          width,
        });
      }
    }

    manifest[assetId] = {
      id: assetId,
      originalFile: relativeFilePath.replace(/\\/g, "/"),
      width: metadata.width,
      height: metadata.height,
      aspectRatio: Number((metadata.width / metadata.height).toFixed(6)),
      formats,
    };
  }

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    `Optimized ${Object.keys(manifest).length} image(s) into ${path.relative(ROOT_DIR, OUTPUT_DIR)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
