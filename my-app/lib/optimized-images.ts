import manifest from "@/src/assets/images/optimized-manifest.json";

type OptimizedFormat = {
  src: string;
  width: number;
};

export type OptimizedImageAsset = {
  id: string;
  originalFile: string;
  width: number;
  height: number;
  aspectRatio: number;
  formats: {
    avif: OptimizedFormat[];
    webp: OptimizedFormat[];
  };
};

const optimizedManifest = manifest as Record<string, OptimizedImageAsset>;

function slugifyPath(relativeFilePath: string) {
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

export function getOptimizedAssetIdFromSrc(src?: string | null) {
  if (!src) {
    return null;
  }

  const [pathPart] = src.split(/[?#]/, 1);
  if (!pathPart) {
    return null;
  }

  const normalizedPath = decodeURIComponent(pathPart).replace(/^\/+/, "");
  if (!normalizedPath) {
    return null;
  }

  return slugifyPath(normalizedPath);
}

export function getOptimizedImageAsset(assetId?: string | null) {
  if (!assetId) {
    return null;
  }

  return optimizedManifest[assetId] ?? null;
}

export function buildOptimizedSrcSet(
  asset: OptimizedImageAsset,
  format: keyof OptimizedImageAsset["formats"],
) {
  return asset.formats[format]
    .map((source) => `${source.src} ${source.width}w`)
    .join(", ");
}
