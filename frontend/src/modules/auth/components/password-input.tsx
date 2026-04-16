"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends InputProps {
  label: string;
  errorText?: string;
  containerClassName?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, errorText, containerClassName, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className={cn("space-y-2", containerClassName)}>
        <div className="flex items-center justify-between">
          <Label htmlFor={id} className={errorText ? "text-red-500" : ""}>
            {label}
          </Label>
        </div>
        <div className="relative">
          <Input
            id={id}
            type={showPassword ? "text" : "password"}
            ref={ref}
            error={!!errorText}
            className="pr-10"
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errorText && (
          <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {errorText}
          </p>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
