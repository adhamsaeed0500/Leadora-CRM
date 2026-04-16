import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg bg-surface px-4 py-2 text-sm text-foreground transition-premium placeholder:text-muted focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 border border-border-ghost",
          error && "border-red-500 focus:ring-red-500/5",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
