"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GuardRoutesProps {
  children: React.ReactNode;
}

export function GuardRoutes({ children }: GuardRoutesProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authAccessToken");

    if (!token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    setChecking(false);
  }, [router, pathname]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm">
          Checking authentication...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
