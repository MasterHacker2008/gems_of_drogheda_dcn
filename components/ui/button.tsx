import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-bold transition-[transform,background-color,color] duration-150 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-cta hover:bg-[#15707F]",
        dark: "bg-foreground text-background hover:bg-[#3A342C]",
        gold: "bg-secondary text-secondary-foreground hover:bg-[#F5BC60]",
        outline:
          "border border-foreground/80 bg-transparent text-foreground hover:bg-foreground hover:text-background",
        "outline-on-dark":
          "border border-background/30 bg-transparent text-background hover:bg-background/10",
        "outline-on-gold":
          "border border-secondary-foreground/40 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        link: "bg-transparent text-foreground underline-offset-4 hover:text-primary hover:underline",
      },
      size: {
        sm: "px-5 py-2.5 text-sm",
        md: "px-6 py-3.5 text-[15px]",
        lg: "px-7 py-4 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
