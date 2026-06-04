import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-aura-wine/10 bg-white/82 shadow-luxury backdrop-blur dark:border-white/10 dark:bg-white/8",
        className,
      )}
      {...props}
    />
  );
}

export { Card };
