import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label ? (
          <label className="text-sm font-medium text-slate-700">{label}</label>
        ) : null}

        <select
          ref={ref}
          className={cn(
            "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-500",
            error ? "border-red-500" : "",
            className,
          )}
          {...props}
        >
          {children}
        </select>

        {error ? <p className="text-xs text-red-500">{error}</p> : null}
      </div>
    );
  },
);

Select.displayName = "Select";
