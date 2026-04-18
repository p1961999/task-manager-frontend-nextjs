"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuardRoute({ children }: AuthGuardProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authAccessToken");

    if (token) {
      router.replace("/dashboard");
      return;
    }
    setChecking(false);
  }, [router]);

  if (checking) return null;

  return <>{children}</>;
}
