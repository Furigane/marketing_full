"use client";

import { useEffect, useState, type ReactNode } from "react";

import { useRouter } from "@/i18n/navigation";
import { ADMIN_ACCESS_TOKEN_KEY } from "@/lib/admin-auth";

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [hasAccess] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return Boolean(sessionStorage.getItem(ADMIN_ACCESS_TOKEN_KEY)?.trim());
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!hasAccess) {
      router.replace("/admin/login");
    }
  }, [hasAccess, router]);

  if (!hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-[var(--design-btn)] border-t-transparent"
          aria-hidden
        />
      </div>
    );
  }

  return <>{children}</>;
}
