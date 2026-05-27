import { cn } from "@/lib/cn";

type SiteContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "main" | "article";
};

export function SiteContainer({
  children,
  className,
  as: Tag = "div",
}: SiteContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
