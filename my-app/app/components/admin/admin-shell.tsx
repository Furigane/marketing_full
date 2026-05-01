"use client";

import { useEffect, useState, type ReactNode } from "react";

import { Sidebar } from "@/app/components2/sidebar/sidebar";
import { SecondHeader, type User } from "@/app/components2/second-header/second-header";
import { useRouter } from "@/i18n/navigation";
import { ADMIN_ACCESS_TOKEN_KEY, ADMIN_THEME_KEY } from "@/lib/admin-auth";

const ADMIN_USER: User = {
  id: "1",
  name: "Aibek",
  avatar: "/img/Mask group.png",
  role: "Student",
  rank: 1,
  solved: 100,
};

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const savedTheme = window.localStorage.getItem(ADMIN_THEME_KEY);
      if (savedTheme === "dark") return true;
      if (savedTheme === "light") return false;
      return document.documentElement.classList.contains("dark");
    } catch {
      return document.documentElement.classList.contains("dark");
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      window.localStorage.setItem(ADMIN_THEME_KEY, isDark ? "dark" : "light");
    } catch {
      // Ignore localStorage errors.
    }
  }, [isDark]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1400px] bg-[var(--background)]">
      <Sidebar
        isMobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)}
        onLogout={() => {
          try {
            sessionStorage.removeItem(ADMIN_ACCESS_TOKEN_KEY);
          } catch {
            /* ignore */
          }
          router.replace("/admin/login");
        }}
      />

      <div className="min-h-screen min-w-0 lg:pl-64">
        <SecondHeader
          user={ADMIN_USER}
          toggleTheme={() => setIsDark((prev) => !prev)}
          isDark={isDark}
          toggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)}
        />

        <main className="px-3 pb-6 pt-3 sm:px-4 md:px-6 md:pb-8 md:pt-4">{children}</main>
      </div>
    </div>
  );
}
