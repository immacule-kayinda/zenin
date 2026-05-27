import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
  bleed?: boolean;
};

export function Section({
  children,
  className,
  id,
  as: Tag = "section",
  bleed = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        bleed ? "w-full" : "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
