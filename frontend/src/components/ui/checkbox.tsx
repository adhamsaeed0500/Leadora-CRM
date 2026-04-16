import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, checked, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked || false);

    const handleToggle = () => {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      onCheckedChange?.(newChecked);
    };

    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isChecked}
          ref={ref}
          onChange={handleToggle}
          {...props}
        />
        <div
          onClick={handleToggle}
          className={cn(
            "h-5 w-5 rounded border border-border-ghost bg-surface transition-premium cursor-pointer flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20",
            className
          )}
        >
          {isChecked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
