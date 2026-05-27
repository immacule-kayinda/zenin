import Image from "next/image";

import { cn } from "@/lib/cn";

type AspectRatio = "4/5" | "16/9" | "1/1";

const aspectClasses: Record<AspectRatio, string> = {
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
};

type ImageFrameProps = {
  src: string;
  alt: string;
  aspect?: AspectRatio;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
};

export function ImageFrame({
  src,
  alt,
  aspect = "4/5",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
  fill = true,
}: ImageFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-ink/[0.04]",
        aspectClasses[aspect],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
