import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant: "pending" | "in-progress" | "done" | "low" | "medium" | "high";
}

export function Badge({ label, variant }: BadgeProps) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-orange-100 text-orange-700",
    done: "bg-green-100 text-green-700",
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-lg px-2.5 py-1 text-xs font-medium",
        styles[variant],
      )}
    >
      {label}
    </span>
  );
}
