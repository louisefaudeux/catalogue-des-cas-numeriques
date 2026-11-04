import { cn } from "@/lib/utils";

const SRC = {
  color: "/brand/alliance-digitale.png",
  white: "/brand/alliance-digitale-blanc.png",
  mono: "/brand/alliance-digitale-mono.png",
} as const;

/** Logo Alliance Digitale. Repli : texte si le fichier est absent. */
export function Logo({ variant = "color", className }: { variant?: keyof typeof SRC; className?: string }) {
  return (
    <img
      src={SRC[variant]}
      alt="Alliance Digitale"
      className={cn("block h-9 w-auto", className)}
      onError={(e) => {
        const img = e.currentTarget;
        const span = document.createElement("span");
        span.className = "font-heading text-base font-bold";
        span.textContent = "Alliance Digitale";
        img.replaceWith(span);
      }}
    />
  );
}
