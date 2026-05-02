import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Languages, LayoutDashboard, LogOut, Newspaper } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Link } from "@/i18n/navigation";

interface SidebarProps {
  isMobileOpen: boolean;
  closeMobile: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  closeMobile,
  onLogout,
}) => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin", label: "Заявки", icon: LayoutDashboard },
    { href: "/admin/blog", label: "Блог", icon: Newspaper },
    { href: "/admin/translations", label: "Переводы", icon: Languages },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={twMerge(
          `fixed left-0 top-0 z-50 h-screen w-64
           border-r border-black/10 bg-[var(--team-surface)]
           transition-transform duration-300 ease-out dark:border-white/10`,
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-8 flex items-center gap-3 rounded-full bg-[var(--background)] px-3 py-2 shadow-sm">
            <Image
              src="/svg/logo.svg"
              alt="Creative Group logo"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0"
            />
            <h1 className="text-sm font-extrabold tracking-tight text-[var(--foreground)] md:text-base">
              CREATIVE GROUP
            </h1>
          </div>

          <nav className="flex-1 space-y-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={twMerge(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[var(--design-btn)] text-[var(--foreground)]"
                      : "text-[var(--design-muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-black/10 pt-4 dark:border-white/10">
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--design-muted)] transition-colors hover:bg-red-100/70 hover:text-red-600 dark:hover:bg-red-900/30"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
