"use client";

import { Bell, Search, Wifi, UserCircle2 } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Manage your tasks efficiently</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-3 lg:flex">
          <Search className="mr-2 h-4 w-4 text-slate-400" />
          <input
            placeholder="Search..."
            className="h-10 bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100 cursor-pointer">
          <Bell className="h-5 w-5" />
        </button>

        <button className="rounded-full text-slate-600 hover:bg-slate-100">
          <UserCircle2 className="h-9 w-9" />
        </button>
      </div>
    </header>
  );
}