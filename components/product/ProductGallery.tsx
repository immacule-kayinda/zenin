import { ImageFrame } from "@/components/ui/ImageFrame";
import type { ProductImage } from "@/lib/products";

type ProductGalleryProps = {
  images: ProductImage[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const [primary, ...rest] = images;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr] lg:gap-6">
      <ImageFrame
        src={primary.src}
        alt={primary.alt}
        aspect={primary.aspect ?? "4/5"}
        priority
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="lg:min-h-[32rem]"
      />
      {rest.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {rest.map((image) => (
            <ImageFrame
              key={image.src}
              src={image.src}
              alt={image.alt}
              aspect={image.aspect ?? "16/9"}
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
