import { useState } from "react";

export function AssetImage({
  src,
  alt,
  fallbackEmoji = "🖼️",
  className = "",
  imgClassName = "",
  fallbackTextClassName = "text-4xl",
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
        title={`Missing asset: ${src}`}
      >
        <span className={fallbackTextClassName} aria-hidden>
          {fallbackEmoji}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${className} ${imgClassName} object-cover`}
      loading="lazy"
    />
  );
}
