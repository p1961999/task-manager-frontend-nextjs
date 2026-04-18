"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CheckCircle2, LayoutDashboard, ListTodo, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { authService } from "@/services/auth.service";

const items = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", href: "/dashboard", icon: ListTodo },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logoutFromStore = useAuthStore((state) => state.logout);

  const logOut = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      logoutFromStore();
      router.replace("/login");
    }
  };

  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
        <CheckCircle2 className="h-7 w-7 text-blue-600" />
        <span className="text-xl font-bold text-blue-600">Task Manager</span>
      </div>

      <nav className="flex-1 px-4 py-5">
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-100",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button
          onClick={logOut}
          className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
