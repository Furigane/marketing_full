import type { ImgHTMLAttributes } from "react";

import {
  buildOptimizedSrcSet,
  getOptimizedAssetIdFromSrc,
  getOptimizedImageAsset,
} from "@/lib/optimized-images";

type OptimizedImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height" | "loading"
> & {
  assetId?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
};

export default function OptimizedImage({
  assetId,
  src,
  alt,
  width,
  height,
  sizes,
  loading,
  priority = false,
  className,
  ...imgProps
}: OptimizedImageProps) {
  const resolvedAssetId = assetId ?? getOptimizedAssetIdFromSrc(src);
  const asset = getOptimizedImageAsset(resolvedAssetId);
  const resolvedWidth = width ?? asset?.width;
  const resolvedHeight = height ?? asset?.height;
  const resolvedLoading = priority ? "eager" : (loading ?? "lazy");

  return (
    <picture>
      {asset ? (
        <>
          <source
            type="image/avif"
            srcSet={buildOptimizedSrcSet(asset, "avif")}
            sizes={sizes}
          />
          <source
            type="image/webp"
            srcSet={buildOptimizedSrcSet(asset, "webp")}
            sizes={sizes}
          />
        </>
      ) : null}
      <img
        {...imgProps}
        src={src}
        alt={alt}
        width={resolvedWidth}
        height={resolvedHeight}
        loading={resolvedLoading}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
