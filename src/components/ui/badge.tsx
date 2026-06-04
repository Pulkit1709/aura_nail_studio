import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-aura-soft px-3 py-1 text-xs font-semibold text-aura-wine dark:bg-white/10 dark:text-aura-soft",
        className,
      )}
      {...props}
    />
  );
}
