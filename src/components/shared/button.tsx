import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger"; 
}

export function Button({
    className,
    variant="primary",
    ...props
}: ButtonProps){
    const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition cursor-pointer";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-200 text-slate-800",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return <button className={cn(base, variants[variant], className)} {...props} />;
}