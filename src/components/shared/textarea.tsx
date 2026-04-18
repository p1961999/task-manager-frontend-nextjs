import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label ? (
          <label className="text-sm font-medium text-slate-700">{label}</label>
        ) : null}

        <textarea
          ref={ref}
          className={cn(
            "min-h-[100px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500",
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

Textarea.displayName = "Textarea";
