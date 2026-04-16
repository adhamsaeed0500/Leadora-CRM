import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputFieldProps extends InputProps {
  label: string;
  errorText?: string;
  containerClassName?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, errorText, containerClassName, id, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        <Label htmlFor={id} className={errorText ? "text-red-500" : ""}>
          {label}
        </Label>
        <Input id={id} ref={ref} error={!!errorText} {...props} />
        {errorText && (
          <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {errorText}
          </p>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export { InputField };
