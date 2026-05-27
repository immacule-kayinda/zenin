import Image from "next/image";

import { cn } from "@/lib/cn";

type HeroFloatMediaProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Espace réservé dans le hero pour la photo d'haltère.
 * Remplacer `src` par votre asset (WebP/PNG fond transparent de préférence).
 */
export function HeroFloatMedia({ src, alt, className }: HeroFloatMediaProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[20rem] flex-1 items-center justify-center sm:min-h-[24rem] lg:min-h-0 lg:py-12",
        className,
      )}
    >
      {/* Zone vide : le produit flotte au centre, pas en plein bord */}
      <div className="relative mx-auto flex h-full w-full max-w-[min(100%,28rem)] flex-col items-center justify-center px-8 py-12 sm:px-12 sm:py-16 lg:max-w-[32rem] lg:px-14">
        <div className="hero-float relative z-10 w-full">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[18rem] sm:max-w-[20rem] lg:max-w-[22rem]">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 22rem"
              className="object-contain object-center"
            />
          </div>
        </div>

        {/* Assise visuelle sous l'haltère */}
        <div
          className="hero-float-shadow mt-6 h-px w-[55%] max-w-[14rem] rounded-full bg-ink/[0.08] sm:mt-8"
          aria-hidden
        />
      </div>
    </div>
  );
}
