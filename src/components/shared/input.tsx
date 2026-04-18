import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label ? (
          <label className="text-sm font-medium text-slate-700">{label}</label>
        ) : null}

        <input
          ref={ref}
          className={cn(
            "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500",
            error ? "border-red-500" : "",
            className,
          )}
          {...props}
        />
        {error ? <p className="text-xs text-red-500">{error}</p> : null}
      </div>
    );
  },
);

Input.displayName = "Input";
