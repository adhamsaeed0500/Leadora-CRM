import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {

    const variants = {
      primary: "button-gradient text-white shadow-premium hover:opacity-90 active:scale-[0.98]",
      secondary: "bg-surface-low text-foreground hover:bg-surface-dim",
      outline: "bg-transparent border border-border-ghost text-foreground hover:bg-surface-low",
      ghost: "bg-transparent text-foreground hover:bg-surface-low",
    };

    const sizes = {
      md: "h-11 px-6 text-sm font-medium",
      sm: "h-9 px-4 text-xs font-medium",
      lg: "h-14 px-8 text-base font-semibold",
      icon: "h-11 w-11 flex items-center justify-center",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg transition-premium outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
