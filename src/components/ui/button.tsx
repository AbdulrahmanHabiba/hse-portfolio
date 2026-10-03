import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary: "bg-hazard text-ink hover:bg-[#ffc929] border border-ink/80",
  secondary: "bg-transparent text-ink border border-ink/40 hover:bg-ink hover:text-surface",
  danger: "bg-transparent text-stop border border-stop/50 hover:bg-stop hover:text-white",
  ghost: "bg-transparent text-ink hover:bg-ink/8 border border-transparent",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[0.95rem]",
  sm: "px-3 py-1.5 text-sm",
};

/** Class generator so `<Link>` and `<button>` can share exactly the same look. */
export function buttonStyles({ variant = "primary", size = "md" }: { variant?: Variant; size?: Size } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
