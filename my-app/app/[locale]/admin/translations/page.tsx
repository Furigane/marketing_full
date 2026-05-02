"use client";

import { AdminAuthGuard } from "@/app/components/admin/admin-auth-guard";
import { AdminShell } from "@/app/components/admin/admin-shell";
import { TranslationsManager } from "@/app/components/admin/translations-manager";

export default function AdminTranslationsPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <TranslationsManager />
      </AdminShell>
    </AdminAuthGuard>
  );
}
