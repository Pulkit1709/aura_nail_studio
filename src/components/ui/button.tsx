import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aura-blush disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-aura-wine text-white shadow-lg shadow-aura-wine/20 hover:-translate-y-0.5 hover:bg-aura-wine/90",
        blush:
          "bg-aura-blush text-aura-ink shadow-lg shadow-aura-blush/30 hover:-translate-y-0.5 hover:bg-aura-blush/90",
        outline:
          "border border-aura-wine/20 bg-white/70 text-aura-wine backdrop-blur hover:bg-aura-soft dark:bg-white/10 dark:text-white",
        ghost: "text-aura-wine hover:bg-aura-soft dark:text-aura-soft",
        whatsapp:
          "bg-[#25D366] text-white shadow-lg shadow-emerald-600/25 hover:-translate-y-0.5 hover:bg-[#20bd5a]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 py-4 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
